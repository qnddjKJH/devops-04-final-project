# vpc 엔드포인트
resource "aws_vpc_endpoint" "dynamodb" { 
  vpc_id = var.vpc_id_db
  service_name = "com.amazonaws.ap-northeast-2.dynamodb"
  vpc_endpoint_type = "Gateway"

        policy = <<POLICY
{
    "Statement": [
        {
            "Action": "*",
            "Effect": "Allow",
            "Resource": "*",
            "Principal": "*"
        }
    ]
}
POLICY

  tags = {
    Environment = "mission_link_endpoint"
    project = "MissionLink"
  }
}

resource "aws_vpc_endpoint_route_table_association" "dynamodb_endpoint_association" {
  route_table_id  = aws_route_table.mission_link_prv_rtb.id
  vpc_endpoint_id = aws_vpc_endpoint.dynamodb.id
}