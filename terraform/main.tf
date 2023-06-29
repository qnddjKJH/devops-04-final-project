terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "ap-northeast-2"
}

locals {
  cluster_name = "mission-link-eks-cluster"
}

# create vpc and subnets
module "mission_link_vpc" {
    source = "./modules/vpc"

    cluster_name = local.cluster_name
}

module "mission_link_db" {
    source = "./modules/database"

    vpc_id = module.mission_link_vpc.vpc_id
    public_subnet_ids = module.mission_link_vpc.public_subnet_ids
    private_subnet_ids = module.mission_link_vpc.private_subnet_ids
    private_subnet_rtb_id = module.mission_link_vpc.private_subnet_rtb_id
}

module "mission_link_event" {
    source = "./modules/event"
}

# create bstion host
module "mission_link_bastion" {
  source = "./modules/bastion"

  vpc_id = module.mission_link_vpc.vpc_id
  public_subnet_ids = module.mission_link_vpc.public_subnet_ids
  private_subnet_ids = module.mission_link_vpc.private_subnet_ids
}

# create EKS Cluster
module "mission_link_eks_cluster" {
  source = "./modules/eks"

  vpc_id = module.mission_link_vpc.vpc_id
  public_subnet_ids = module.mission_link_vpc.public_subnet_ids
  private_subnet_ids = module.mission_link_vpc.private_subnet_ids
  bastion_sg_id = module.mission_link_bastion.bastion_sg_id
}






resource "null_resource" "script_execution" {
  depends_on = [
    module.mission_link_eks_cluster
  ]

  provisioner "local-exec" {
    command = "echo 'yes' | bash ./scripts/upload.sh ${module.mission_link_bastion.bastion_instance_id}"
  }
}