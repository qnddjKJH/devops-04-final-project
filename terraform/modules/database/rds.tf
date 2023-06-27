# DB 서브넷 그룹 생성
resource "aws_db_subnet_group" "dbsg" {
  name = "mission_link_db_sg"
  subnet_ids = var.private_subnet_ids
  tags = {
    Name = "mission_link_dbsg"
    project = "MissionLink"
  }
}

resource "aws_db_instance" "db" {
  allocated_storage    = 20
  db_name              = "mission_link_Rds"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  username             = var.username
  password             = aws_secretsmanager_secret_version.db_password.secret_string

  skip_final_snapshot  = true
  vpc_security_group_ids = [aws_security_group.mission_link_prvsg.id]
  availability_zone = element(data.aws_availability_zones.available.names, 0)
  db_subnet_group_name = aws_db_subnet_group.dbsg.name
  publicly_accessible    = true

  tags = {
    Name = "mission_link_RDS"
    project = "MissionLink"
  }
}