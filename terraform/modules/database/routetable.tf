# privite 라우팅 테이블 생성
resource "aws_route_table" "mission_link_prv_rtb" {
    vpc_id = var.vpc_id_db

  tags = {
    Name = "mission_link_route"
    project = "MissionLink"
  }
}

# private 라우팅 테이블 연결
resource "aws_route_table_association" "mission_link_prv_rtb_association" {
    count = length(var.prv_sub_id_db)
    subnet_id   = var.prv_sub_id_db[0]
    route_table_id = aws_route_table.mission_link_prv_rtb.id
}