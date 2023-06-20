output "bastion_sg_id" {
  value = aws_security_group.mission_link_bastion_sg.id
}

output "bastion_instance_id" {
    value = aws_instance.bastion_host.id
}