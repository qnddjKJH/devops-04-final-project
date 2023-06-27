# bat 람다 생성
module "mission_link_bet_lambda" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "2.7.0"
  # insert the 28 required variables here
  function_name = "mission_link_bet_lambda"
  description   = "Generates a new profiles"
  handler       = "bet.handler"
  runtime       = "nodejs18.x"
  source_path   = "${path.module}/source"
  timeout       = 300

  tags = {
    Name = "mission_link_bet_lambda"
    project = "MissionLink"
  }
}

# success 람다 생성
module "mission_link_success_lambda" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "2.7.0"
  # insert the 28 required variables here
  function_name = "mission_link_success_lambda"
  description   = "Generates a new profiles"
  handler       = "success.handler"
  runtime       = "nodejs18.x"
  source_path   = "${path.module}/source"
  timeout       = 300


  tags = {
    Name = "mission_link_success_lambda"
    project = "MissionLink"
  }
}

# fail 람다 생성
module "mission_link_fail_lambda" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "2.7.0"
  # insert the 28 required variables here
  function_name = "mission_link_fail_lambda"
  description   = "Generates a new profiles"
  handler       = "fail.handler"
  runtime       = "nodejs18.x"
  source_path   = "${path.module}/source"
  timeout       = 300

  tags = {
    Name = "mission_link_fail_lambda"
    project = "MissionLink"
  }
}
