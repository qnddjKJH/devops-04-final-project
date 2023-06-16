variable "vpc_id_db" {
  description = "Value of the Name tag for the vpc_id"
  type        = string
  default     = "default"
}

variable "prv_sub_id_db" {
  description = "Value of the Name tag for the prvsub_id"
  default     = "default"
}

variable "pub_sub_id_db" {
  description = "Value of the Name tag for the pubsub_id"
  default     = "default"
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

variable "availability_zone_db" {
  description = "Value of the Name tag for the availability_zone_db"
  default     = "default"
}