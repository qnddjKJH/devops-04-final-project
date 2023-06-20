variable "vpc_id" {
  description = "Value of the Name tag for the vpc_id"
  type        = string
}

variable "private_subnet_ids" {
  description = "Value of the Name tag for the prvsub_id"
  type = list(string)
}

variable "public_subnet_ids" {
  description = "Value of the Name tag for the pubsub_id"
  type = list(string)
}

variable "username" {
  description = "Value of the Name tag for username"
  type        = string
  default     = "team4"
}

variable "password" {
  description = "Value of the Name tag for password"
  type        = string
  default     = "00000000"
}

data "aws_availability_zones" "available" {
	state = "available"
}

variable "allowed_cidr_blocks" {
  description = "default allowed cidr blocks"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "allowed_account" {
  description = "default allowed account"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "private_subnet_rtb_id" {
  description = "pri subs main rtb"
  type        = string
}