# vpc 생성
resource "aws_vpc" "mission_link_vpc" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"
  enable_dns_hostnames = true
  enable_dns_support = true

  tags = {
    Name = "mission_link_vpc"
    # project = "MissionLink"
  }
}

# 사용 가능한 가용 영역 가져오기
data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_subnet" "public_subnet" {
  count             = length(data.aws_availability_zones.available.names)
  vpc_id            = aws_vpc.mission_link_vpc.id
  cidr_block        = cidrsubnet(aws_vpc.mission_link_vpc.cidr_block, 8, count.index * 4)
  availability_zone = element(data.aws_availability_zones.available.names, count.index)

  tags = {
    Name = "mission_link_public_subnet${count.index}"
    # project = "MissionLink"
  }
}

resource "aws_subnet" "private_subnet" {
  count             = length(data.aws_availability_zones.available.names)
  vpc_id            = aws_vpc.mission_link_vpc.id
  cidr_block        = cidrsubnet(aws_vpc.mission_link_vpc.cidr_block, 8, count.index * 4 + 1)
  availability_zone = element(data.aws_availability_zones.available.names, count.index)

  tags = {
    Name = "mission_link_private_subnet${count.index}"
    # project = "MissionLink"
  }
}

# public 서브넷들의 인터넷 연결을 위한 인터넷 게이트웨이 생성
resource "aws_internet_gateway" "mission_link_igw" {
  vpc_id = aws_vpc.mission_link_vpc.id

  tags = {
    Name = "mission_link_pub_igw"
    # project = "MissionLink"
  }
}

# public 서브넷들과 인터넷 게이트웨이를 연결하는 라우팅 테이블 생성
resource "aws_route_table" "mission_link_pub_rtb" {
  vpc_id = aws_vpc.mission_link_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.mission_link_igw.id
  }

  tags = {
    Name = "mission_link_pub_rtb"
    # project = "MissionLink"
  }
}

# public 서브넷들과 인터넷 게이트웨이를 연결하는 라우트 테이블 연결
resource "aws_route_table_association" "mission_link_pub_rtb_association" {
  count          = length(aws_subnet.public_subnet)
  subnet_id      = aws_subnet.public_subnet[count.index].id
  route_table_id = aws_route_table.mission_link_pub_rtb.id
}

#NAT 게이트웨이가 사용할 Elastic IP 생성
resource "aws_eip" "eip" {
    vpc = true
    # project = "MissionLink"
}

#NAT 게이트웨이 생성
resource "aws_nat_gateway" "nat" {
    allocation_id = aws_eip.eip.id
    subnet_id = aws_subnet.public_subnet[0].id

    tags = {
        Name = "terraform-nat"
        # project = "MissionLink"
    }
}

# privite 라우팅 테이블 생성
resource "aws_route_table" "mission_link_prv_rtb" {
    vpc_id = aws_vpc.mission_link_vpc.id

    tags = {
          Name = "terraform-prv-route-table"
          # project = "MissionLink"
    }
}

# private 라우팅 테이블 연결
resource "aws_route_table_association" "mission_link_prv_rtb_association" {
    count = length(aws_subnet.private_subnet)
    subnet_id   = aws_subnet.private_subnet[count.index].id
    route_table_id = aws_route_table.mission_link_prv_rtb.id
}

# 라우팅 테이블과 nat 연결
resource "aws_route" "prvroute1" {
    route_table_id         = aws_route_table.mission_link_prv_rtb.id
    destination_cidr_block = "0.0.0.0/0"
    nat_gateway_id         = aws_nat_gateway.nat.id
}

# vpc 엔드포인트
resource "aws_vpc_endpoint" "dynamodb" { 
  vpc_id = aws_vpc.mission_link_vpc.id
  service_name = "com.amazonaws.ap-northeast-2.dynamodb"
  vpc_endpoint_type = "Gateway"

        policy = <<POLICY
{
    "Statement": [
        {
            "Action": "*",
            "Effect": "Allow",
            "Resource": "*",
            "Principal": "*"
        }
    ]
}
POLICY

  tags = {
    Environment = "mission_link_endpoint"
  }
}

resource "aws_vpc_endpoint_route_table_association" "dynamodb_endpoint_association" {
  route_table_id  = aws_route_table.mission_link_prv_rtb.id
  vpc_endpoint_id = aws_vpc_endpoint.dynamodb.id
}