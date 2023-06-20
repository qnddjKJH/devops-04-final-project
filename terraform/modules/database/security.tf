# private security_group 생성
  resource "aws_security_group" "mission_link_prvsg" {
    vpc_id = var.vpc_id
    name   = "terraform-prv-sg1"
    description = "terraform-prv-sg1"

    ingress {
      from_port   = 3306
      to_port     = 3306
      protocol    = "tcp"
      cidr_blocks = var.allowed_cidr_blocks
    }

    ingress {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = var.allowed_cidr_blocks
    }

    egress {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = var.allowed_cidr_blocks
  }

    tags = {
        Name = "mission_link_prv_sg_db"
        project = "MissionLink"
    }
  }