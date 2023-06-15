output "prv_sg" {
  value = aws_security_group.mission_link_prvsg.id
}

output "dynamo-prv-sg" {
  value = aws_security_group.mission_link_dynamo_prvsg.id
}