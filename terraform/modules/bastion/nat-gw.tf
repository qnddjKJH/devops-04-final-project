resource "aws_nat_gateway" "mission_link_nat_gw" {
  allocation_id = aws_eip.mission_link_nat_eip.id
  subnet_id     = element(var.public_subnet_ids, 0)

  tags = {
    Name    = "mission_link_nat_gw"
    project = "MissionLink"
  }
}

resource "aws_eip" "mission_link_nat_eip" {
  vpc = true

  tags = {
    Name    = "mission_link_nat_eip"
    project = "MissionLink"
  }
}

# bastion host 와 연결할 첫 번재 private subnet 의 route table 가져오기
data "aws_route_table" "bastion_private0_rtb" {
  filter {
    name   = "association.subnet-id"
    values = [var.private_subnet_ids[0]]
  }
}

# nat gateway 경로 추가
resource "aws_route" "bastion_routing_nat_gw" {
  route_table_id         = data.aws_route_table.bastion_private0_rtb.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_nat_gateway.mission_link_nat_gw.id
}

# resource "aws_route_table" "mission_link_private_bastion_rtb" {
#   vpc_id = var.vpc_id

#   route {
#     cidr_block = "0.0.0.0/0"
#     nat_gateway_id = aws_nat_gateway.mission_link_nat_gw.id
#   }

#   tags = {
#     Name    = "mission_link_private_bastion_rtb"
#     project = "MissionLink"
#   }
# }

# resource "aws_route_table_association" "mission_link_private_rta" {
#   subnet_id      = element(var.private_subnet_ids, 0)
#   route_table_id = aws_route_table.mission_link_private_bastion_rtb.id
# }