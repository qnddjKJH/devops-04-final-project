output "vpc_id" {
  value = aws_vpc.mission_link_vpc.id
}

output "public_subnet_ids" {
  value = aws_subnet.public_subnet[*].id
}