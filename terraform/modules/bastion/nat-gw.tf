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

resource "aws_route_table" "mission_link_private_rtb" {
  vpc_id = var.vpc_id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.mission_link_nat_gw.id
  }

  tags = {
    Name    = "mission_link_private_rtb"
    project = "MissionLink"
  }
}

resource "aws_route_table_association" "mission_link_private_rta" {
  subnet_id      = element(var.private_subnet_ids, 0)
  route_table_id = aws_route_table.mission_link_private_rtb.id
}