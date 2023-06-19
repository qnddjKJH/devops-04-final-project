variable "vpc_id_db" {
  description = "Value of the Name tag for the vpc_id"
  type        = string
}

variable "prv_sub_id_db" {
  description = "Value of the Name tag for the prvsub_id"
  type = list(string)
}

variable "pub_sub_id_db" {
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