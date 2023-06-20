variable "cluster_name" {
  description = "set cluster name"
  default = "missiont_link_eks_cluster"
  type    = string
}

variable "vpc_id" {
  description = "use vpc id"
  type = string
}

variable "public_subnet_ids" {
  description = "public subnet ids"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "private subnet ids"
  type        = list(string)
}

variable "bastion_sg_id" {
  description = "bastion security group id"
  type = string
}