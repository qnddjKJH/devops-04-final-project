output "vpc_id" {
  value = aws_vpc.mission_link_vpc.id
}

output "public_subnet_ids" {
  value = aws_subnet.public_subnet[*].id
}

output "private_subnet_ids" {
  value = aws_subnet.private_subnet[*].id
}

output "availability_zone" {
  value = aws_subnet.private_subnet[0].availability_zone
}