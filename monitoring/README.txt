# monitoring namespace 생성
kubectl create namespace monitoring

# prometheus-community 차트 리포지토리를 추가
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

# prometheus 배포
helm upgrade -i prometheus prometheus-community/prometheus \
    --namespace monitoring \
    --set alertmanager.persistentVolume.storageClass="gp2",server.persistentVolume.storageClass="gp2"

# EKS 클러스터에 IAM OIDC 공급자를 연결
eksctl utils associate-iam-oidc-provider --region=ap-northeast-2 --cluster=mission-link-eks-cluster --approve

# CSI 드라이버 IAM역할 생성
eksctl create iamserviceaccount \
  --name ebs-csi-controller-sa \
  --namespace kube-system \
  --cluster mission-link-eks-cluster \
  --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
  --approve \
  --role-only \
  --role-name AmazonEKS_EBS_CSI_DriverRole

# addon 생성
eksctl create addon --name aws-ebs-csi-driver --cluster mission-link-eks-cluster --service-account-role-arn arn:aws:iam::257840391579:role/AmazonEKS_EBS_CSI_DriverRole --force

# Grafana 배포-monitoring 디렉토리에서 실행
helm install grafana grafana/grafana -f grafana.yaml -n monitoring