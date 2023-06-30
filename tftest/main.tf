provider "aws" {
  region = "ap-northeast-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c9c942bd7bf113a2"
  instance_type = "t2.micro"

  tags = {
    Name = "example-test"
  }
}