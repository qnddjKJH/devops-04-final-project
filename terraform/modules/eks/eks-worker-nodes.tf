#
# EKS Worker Nodes Resources
#  * IAM role allowing Kubernetes actions to access other AWS services
#  * EKS Node Group to launch worker nodes
#

# 워커 노듣에서 다른 aws 리소스에 접근하는 역할 생성 및 정책 연결
resource "aws_iam_role" "mission_link_worker_node_role" {
  name = "mission_link_worker_node_role"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "mission_link_worker_node_role_AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.mission_link_worker_node_role.name
}

resource "aws_iam_role_policy_attachment" "mission_link_worker_node_role_AmazonEKS_CNI_Policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.mission_link_worker_node_role.name
}

resource "aws_iam_role_policy_attachment" "mission_link_worker_node_role_AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.mission_link_worker_node_role.name
}

data "aws_subnet" "selected" {
  id = element(var.public_subnet_ids, 0)
}

resource "aws_security_group" "mission_link_worker_node_sg" {
  name = "mission_link_worker_node_sg"
  vpc_id = var.vpc_id

  ingress {
    protocol = "tcp"
    from_port = 22
    to_port = 22
    cidr_blocks = [data.aws_subnet.selected.cidr_block]
  }

  egress {
    from_port = 0
    protocol = "-1"
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "mission_link_worker_node_sg"
    project = "MissionLink"
  }
}


# 워커노드 그룹 생성
resource "aws_eks_node_group" "mission_link_worker_node_group" {
  cluster_name    = aws_eks_cluster.missiont_link_cluster.name
  node_group_name = "mission_link_worker_node_group"
  node_role_arn   = aws_iam_role.mission_link_worker_node_role.arn
  subnet_ids      = [var.private_subnet_ids[0]]
  # 원래는 private subnet 전체에 워커 노드를 걸어야 한다
  # 하지만 오토 스케일링 작동 방식은 랜덤이다. 즉 인스턴스가 어느 서브넷에 배치될지 모른다.
  # 나중에 네트워크 리팩토링 작업 끝나고 할거
  # subnet_ids      = var.private_subnet_ids

  # 기본값은 t3.medium 이지만 명시적 표시
  instance_types   = ["t3.medium"] 

  scaling_config {
    desired_size = 1
    max_size     = 1
    min_size     = 1
  }

  remote_access {
    ec2_ssh_key = "mlink_worker_node"
    source_security_group_ids = [
      var.bastion_sg_id
    ]
  }

  tags = {
    "Name" = "mission_link_worker_node_${timestamp()}"
  } 

  depends_on = [
    aws_iam_role_policy_attachment.mission_link_worker_node_role_AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.mission_link_worker_node_role_AmazonEKS_CNI_Policy,
    aws_iam_role_policy_attachment.mission_link_worker_node_role_AmazonEC2ContainerRegistryReadOnly,
  ]
}
