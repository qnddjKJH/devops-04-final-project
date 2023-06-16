# DB 서브넷 그룹 생성
resource "aws_db_subnet_group" "dbsg" {
  name = "final-db-sg"
  subnet_ids = var.prv_sub_id_db

  tags = {
    Name = "mission_link_dbsg"
    project = "MissionLink"
  }
}

resource "aws_db_instance" "db" {
  allocated_storage    = 20
  db_name              = "finalRds"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  username             = var.username
  password             = var.password
  skip_final_snapshot  = true
  vpc_security_group_ids = [aws_security_group.mission_link_prvsg.id]
  availability_zone = var.availability_zone_db
  db_subnet_group_name = aws_db_subnet_group.dbsg.name

  tags = {
    Name = "mission_link_RDS"
    project = "MissionLink"
  }
}