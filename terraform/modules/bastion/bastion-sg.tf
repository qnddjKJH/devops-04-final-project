resource "aws_security_group" "mission_link_bastion_sg" {
  name = "mission_link_bastion_sg"
  vpc_id = var.vpc_id

  ingress {
    from_port = 22
    protocol = "tcp"
    to_port = 22
    cidr_blocks = var.allowed_cidr_blocks
  }

  egress {
    from_port = 0
    protocol = "-1"
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "mission_link_bastion_sg"
    project = "MissionLink"
  }
}