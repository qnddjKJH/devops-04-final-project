# privite 라우팅 테이블 생성
resource "aws_route_table" "mission_link_prv_rtb" {
    vpc_id = var.vpc_id

  tags = {
    Name = "mission_link_route"
    project = "MissionLink"
  }
}

# private 라우팅 테이블 연결
resource "aws_route_table_association" "mission_link_prv_rtb_association" {
    count = length(var.private_subnet_ids)
    subnet_id   = var.private_subnet_ids[0]
    route_table_id = aws_route_table.mission_link_prv_rtb.id
}