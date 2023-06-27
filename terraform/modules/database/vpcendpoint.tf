resource "aws_vpc_endpoint" "dynamodb_endpoint" {
  vpc_id             = var.vpc_id

  service_name = "com.amazonaws.ap-northeast-2.dynamodb"
  vpc_endpoint_type  = "Gateway"
}

# dynamo 라우팅 테이블 vpc endpoint 연결
resource "aws_vpc_endpoint_route_table_association" "mission_link_prv_rtb_dynamo_association1" {
  route_table_id   = var.private_subnet_rtb_id
  vpc_endpoint_id  = aws_vpc_endpoint.dynamodb_endpoint.id
}