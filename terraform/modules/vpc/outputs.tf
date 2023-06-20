output "vpc_id" {
  value = aws_vpc.mission_link_vpc.id
}

output "public_subnet_ids" {
  value = aws_subnet.public_subnet[*].id
}

output "private_subnet_ids" {
  value = aws_subnet.private_subnet[*].id
}

output "private_subnet_bastion_rtb_id" {
  value = aws_route_table.mission_link_pri_bastion_rtb.id
}

output "private_subnet_rtb_id" {
  value = aws_route_table.mission_link_pri_rtb.id
}