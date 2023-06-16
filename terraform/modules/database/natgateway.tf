#NAT 게이트웨이가 사용할 Elastic IP 생성
resource "aws_eip" "eip" {
    vpc = true

    tags = {
    Name = "mission_link_eip"
    project = "MissionLink"
  }
}

#NAT 게이트웨이 생성
resource "aws_nat_gateway" "nat" {
    allocation_id = aws_eip.eip.id
    subnet_id = var.pub_sub_id_db[0]

   tags = {
    Name = "mission_link_nat"
    project = "MissionLink"
  }
}

# privite 라우팅 테이블 생성
resource "aws_route_table" "mission_link_prv_rtb" {
    vpc_id = var.vpc_id_db

  tags = {
    Name = "mission_link_route"
    project = "MissionLink"
  }
}

# private 라우팅 테이블 연결
resource "aws_route_table_association" "mission_link_prv_rtb_association" {
    count = length(var.prv_sub_id_db)
    subnet_id   = var.prv_sub_id_db[0]
    route_table_id = aws_route_table.mission_link_prv_rtb.id
}

# 라우팅 테이블과 nat 연결
resource "aws_route" "mission_link_prv_route" {
    route_table_id         = aws_route_table.mission_link_prv_rtb.id
    destination_cidr_block = "0.0.0.0/0"
    nat_gateway_id         = aws_nat_gateway.nat.id
}