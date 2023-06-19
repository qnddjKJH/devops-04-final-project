# dynamoDB Table 생성
resource "aws_dynamodb_table" "mission_link_dynamodb" {
  name           = "mission_link_dynamodb_table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  attribute {
    name = "id"
    type = "S"
  }
  tags = {
    Name = "mission_link_dynamodb"
    project = "MissionLink"
  }
}