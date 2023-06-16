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
  profile = "admin"
}

module "mission_link_vpc" {
    source = "./modules/vpc"
}

module "mission_link_db" {
    source = "./modules/database"

    prv_vpc_id = module.mission_link_vpc.vpc_id
    prvsub_id = module.mission_link_vpc.private_subnet_ids
    prvsg_id = module.mission_link_sg.prv_sg
    availability_zone_db = module.mission_link_vpc.availability_zone
}

module "mission_link_bastion" {
  source = "./modules/bastion"

  vpc_id = module.mission_link_vpc.vpc_id
  public_subnet_ids = module.mission_link_vpc.public_subnet_ids
  private_subnet_ids = module.mission_link_vpc.private_subnet_ids
}