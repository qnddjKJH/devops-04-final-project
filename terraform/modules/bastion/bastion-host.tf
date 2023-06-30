resource "aws_instance" "bastion_host" {
  ami           = var.ami  # Bastion Host AMI ID
  instance_type = "t2.micro"
  key_name      = "mission_link"
  subnet_id     = element(var.public_subnet_ids, 0)

  vpc_security_group_ids = [
    aws_security_group.mission_link_bastion_sg.id
  ]

  tags = {
    Name = "mission_link_bastion_hosts"
    project = "MissionLink"
  }
}