variable "private_sg" {
  description = "Value of the Name tag for the private_sg"
  type        = string
  default     = "default"
}

variable "dynamo_private_sg" {
  description = "Value of the Name tag for the dynamo_private_sg"
  type        = string
  default     = "terraform"
}