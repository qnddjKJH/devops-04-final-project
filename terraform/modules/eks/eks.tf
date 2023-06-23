#
# EKS Cluster Resources
#  * IAM Role to allow EKS service to manage other AWS services
#  * EC2 Security Group to allow networking traffic with EKS cluster
#  * EKS Cluster
#
# eks 서비스가 다른 aws 서비스를 관리하기 위한 iam 역할 생성
resource "aws_iam_role" "missiont_link_cluster_role" {
  name = "missiont_link_eks_cluster_role"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

# 생성한 iam 역할에 정책 연결 정책은 AmazonEKSClusterPolicy (eks 클러스터 정책)
resource "aws_iam_role_policy_attachment" "mission_link_cluster_AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.missiont_link_cluster_role.name
}

# 생성한 iam 역할에 정책 연결 정책은 AmazonEKSVPCResourceController (vpc 관련 정책)
resource "aws_iam_role_policy_attachment" "mission_link_cluster_AmazonEKSVPCResourceController" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.missiont_link_cluster_role.name
}

resource "aws_security_group" "missiont_link_cluster_sg" {
  name        = "missiont_link_eks_cluster_sg"
  description = "Cluster communication with worker nodes"
  vpc_id      = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "missiont_link_cluster_sg"
  }
}

resource "aws_security_group_rule" "eks_cluster_ingress" {
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.missiont_link_cluster_sg.id
  description       = "Allow inbound traffic from EKS cluster"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  type              = "ingress"
}

# EKS Cluster 설정
resource "aws_eks_cluster" "missiont_link_cluster" {
  name     = var.cluster_name
  role_arn = aws_iam_role.missiont_link_cluster_role.arn

  vpc_config {
    security_group_ids = [aws_security_group.missiont_link_cluster_sg.id]
    subnet_ids         = var.private_subnet_ids
    endpoint_private_access = true
    endpoint_public_access = true
  }

  depends_on = [
    aws_iam_role_policy_attachment.mission_link_cluster_AmazonEKSClusterPolicy,
    aws_iam_role_policy_attachment.mission_link_cluster_AmazonEKSVPCResourceController,
  ]
}