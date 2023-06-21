resource "aws_nat_gateway" "mission_link_nat_gw" {
  allocation_id = aws_eip.mission_link_nat_eip.id
  subnet_id     = aws_subnet.public_subnet[0].id

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

# private subnet 에 연결된 route table 에 nat gateway 경로 추가
resource "aws_route" "bastion_routing_nat_gw" {
  route_table_id         = aws_route_table.mission_link_pri_rtb.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_nat_gateway.mission_link_nat_gw.id
}