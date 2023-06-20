# 추후 리팩토링 예정

# # vpc 엔드포인트
# resource "aws_vpc_endpoint" "dynamodb" { 
#   vpc_id = var.vpc_id_db
#   service_name = "com.amazonaws.ap-northeast-2.dynamodb"
#   vpc_endpoint_type = "Gateway"

#         policy = <<POLICY
# {
#     "Statement": [
#         {
#             "Action": "*",
#             "Effect": "Allow",
#             "Resource": "*",
#             "Principal": "*"
#         }
#     ]
# }
# POLICY

#   tags = {
#     Environment = "mission_link_endpoint"
#     project = "MissionLink"
#   }
# }

# resource "aws_vpc_endpoint_route_table_association" "dynamodb_endpoint_association" {
#   route_table_id  = data.aws_route_table.selected.id
#   vpc_endpoint_id = aws_vpc_endpoint.dynamodb.id
# }

resource "aws_vpc_endpoint" "dynamodb_endpoint" {
  vpc_id             = var.vpc_id

  service_name = "com.amazonaws.ap-northeast-2.dynamodb"
  vpc_endpoint_type  = "Gateway"
}

# dynamo 라우팅 테이블 vpc endpoint 연결
resource "aws_vpc_endpoint_route_table_association" "mission_link_prv_rtb_dynamo_association0" {
  route_table_id   = var.private_subnet_bastion_rtb_id
  vpc_endpoint_id  = aws_vpc_endpoint.dynamodb_endpoint.id
}

resource "aws_vpc_endpoint_route_table_association" "mission_link_prv_rtb_dynamo_association1" {
  route_table_id   = var.private_subnet_rtb_id
  vpc_endpoint_id  = aws_vpc_endpoint.dynamodb_endpoint.id
}


# # dynamo 라우팅 테이블 서브넷과 연결
# resource "aws_route_table_association" "mission_link_private_rta" {
#   count = length(var.pub_sub_id_db)
#   subnet_id = element(var.pub_sub_id_db, count.index + 1)
#   route_table_id = aws_route_table.mission_link_private_dynamo_rtb.id
# }