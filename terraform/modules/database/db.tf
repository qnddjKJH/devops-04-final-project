# DB 서브넷 그룹 생성
resource "aws_db_subnet_group" "dbsg" {
  name = "final-db-sg"
  subnet_ids = var.prvsub_id

  tags = {
    "Name" = "final-db-sg"
  }
}

#resource "aws_db_instance" "db" {
#  allocated_storage    = 20
#  db_name              = "finalRds"
#  engine               = "mysql"
#  engine_version       = "8.0"
#  instance_class       = "db.t3.micro"
#  username             = var.username
#  password             = var.password
#  skip_final_snapshot  = true
#  vpc_security_group_ids = [var.prvsg_id]
#  availability_zone = var.availability_zone_db
#  db_subnet_group_name = aws_db_subnet_group.dbsg.name
#  tags = {
#      "Name" = "finalRds"
#  }
#}

# dynamoDB Table 생성
resource "aws_dynamodb_table" "mission_link_dynamodb" {
  name           = "mission-link-dynamodb-table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  attribute {
    name = "id"
    type = "S"
  }
}