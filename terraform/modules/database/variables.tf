variable "prv_vpc_id" {
  description = "Value of the Name tag for the vpc_id"
  type        = string
  default     = "terraform21"
}

variable "prvsub_id" {
  description = "Value of the Name tag for the prvsub_id"
  default     = "terraform21"
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

variable "prvsg_id" {
  description = "Value of the Name tag for the prvsg_id"
  type        = string
  default     = "team4"
}

variable "availability_zone_db" {
  description = "Value of the Name tag for the availability_zone_db"
  default     = "team4"
}