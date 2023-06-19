# EventBridge 베팅 규칙 생성
resource "aws_cloudwatch_event_rule" "bat" {
  name        = "mission_link_bat_event"
  description = "mission_link_bat_event"
  #schedule_expression = "rate(2 minutes)"

  event_pattern = <<PATTERN
{
  "detail-type": ["transaction"],
  "source": ["custom.myATMapp"],
  "detail": {
    "body": ["bat"]
  }
}
PATTERN

  tags = {
    Name = "mission_link_rule_bat"
    project = "MissionLink"
  }
}

# EventBridge 성공 규칙 생성
resource "aws_cloudwatch_event_rule" "success" {
  name        = "mission_link_success_event"
  description = "mission_link_success_event"

  event_pattern = <<PATTERN
{
  "detail-type": ["transaction"],
  "source": ["custom.myATMapp"],
  "detail": {
    "body": ["success"]
  }
}
PATTERN

  tags = {
    Name = "mission_link_rule_success"
    project = "MissionLink"
  }
}

# EventBridge 실패 규칙 생성
resource "aws_cloudwatch_event_rule" "fail" {
  name        = "mission_link_fail_event"
  description = "mission_link_fail_event"

  event_pattern = <<PATTERN
{
  "detail-type": ["transaction"],
  "source": ["custom.myATMapp"],
  "detail": {
    "body": ["fail"]
  }
}
PATTERN

  tags = {
    Name = "mission_link_rule_fail"
    project = "MissionLink"
  }
}

# EventBridge가 bat_lambda를 호출하기 위한 권한 생성
resource "aws_lambda_permission" "allow_cloudwatch_bat_lambda" {
  statement_id = "AllowExecutionFromCloudWatch"
  action = "lambda:InvokeFunction"
  function_name = module.mission_link_bat_lambda.lambda_function_name
  principal = "events.amazonaws.com"
  source_arn = aws_cloudwatch_event_rule.bat.arn
}

# EventBridge가 success_lambda를 호출하기 위한 권한 생성
resource "aws_lambda_permission" "allow_cloudwatch_success_lambda" {
  statement_id = "AllowExecutionFromCloudWatch"
  action = "lambda:InvokeFunction"
  function_name = module.mission_link_success_lambda.lambda_function_name
  principal = "events.amazonaws.com"
  source_arn = aws_cloudwatch_event_rule.success.arn
}

# EventBridge가 fail_lambda를 호출하기 위한 권한 생성
resource "aws_lambda_permission" "allow_cloudwatch_fail_lambda" {
  statement_id = "AllowExecutionFromCloudWatch"
  action = "lambda:InvokeFunction"
  function_name = module.mission_link_fail_lambda.lambda_function_name
  principal = "events.amazonaws.com"
  source_arn = aws_cloudwatch_event_rule.fail.arn
}

# EventBridge에 bat 람다 타겟 연결 
resource "aws_cloudwatch_event_target" "lambda_target_bat" {
  arn = module.mission_link_bat_lambda.lambda_function_arn
  rule = aws_cloudwatch_event_rule.bat.name
}

# EventBridge에 success 람다 타겟 연결 
resource "aws_cloudwatch_event_target" "lambda_target_success" {
  arn = module.mission_link_success_lambda.lambda_function_arn
  rule = aws_cloudwatch_event_rule.success.name
}

# EventBridge에 fail 람다 타겟 연결
resource "aws_cloudwatch_event_target" "lambda_target_fail" {
  arn = module.mission_link_fail_lambda.lambda_function_arn
  rule = aws_cloudwatch_event_rule.fail.name
}