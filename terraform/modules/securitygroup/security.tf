# 퍼블릭 보안 그룹 생성
  resource "aws_security_group" "pubsg" {
      vpc_id = var.sec_vpc_id
      name   = "terraform-pub-sg"
      description = "terraform-pub-sg"

    ingress {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
      from_port   = -1
      to_port     = -1
      protocol    = "icmp"
      cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "terraform-pub-sg"
    }
}

# private security_group 생성
  resource "aws_security_group" "mission_link_prvsg" {
    vpc_id = var.sec_vpc_id
    name   = "terraform-prv-sg1"
    description = "terraform-prv-sg1"
    ingress {
      from_port   = 3306
      to_port     = 3306
      protocol    = "tcp"
      security_groups = [aws_security_group.pubsg.id]
    }

    ingress {
      from_port   = 8000
      to_port     = 8000
      protocol    = "tcp"
      security_groups = [aws_security_group.pubsg.id]
    }

    egress {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
  }

    tags = {
        Name = "terraform-prv-sg1"
    }
  }

#vpc_endpoint 보안 그룹
  resource "aws_security_group" "mission_link_dynamo_prvsg" {
    vpc_id = var.sec_vpc_id
    name   = "terraform-dynamo-prv-sg"
    description = "terraform-dynamo-prv-sg"
    ingress {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      security_groups = [aws_security_group.pubsg.id]
    }

    egress {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
  }

    tags = {
        Name = "terraform-dynamo-prv-sg"
    }
  }
