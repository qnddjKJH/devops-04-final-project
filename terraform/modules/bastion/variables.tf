variable "ami" {
  description = "Value of the Name tag for the ami"
  type        = string
  default     = "ami-0c9c942bd7bf113a2"
}

variable "instance_type" {
  description = "default instance_type"
  type        = string
  default     = "t2.micro"
}

variable "public_subnet_ids" {
  description = "public subnet ids"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "private subnet ids"
  type        = list(string)
}

variable "vpc_id" {
  description = "value of vpc id"
  type        = string
}

variable "allowed_cidr_blocks" {
  description = "default allowed cidr blocks"
  type        = list(string)
  default     = ["0.0.0.0/16"]
}