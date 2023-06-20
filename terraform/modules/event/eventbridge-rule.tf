# EventBridge 베팅 규칙 생성
resource "aws_cloudwatch_event_rule" "bet" {
  name        = "mission_link_bet_event"
  description = "mission_link_bet_event"

  event_pattern = <<PATTERN
{
  "detail-type": ["transaction"],
  "source": ["mission_link"],
  "detail": {
    "action": ["bet"]
  }
}
PATTERN

  tags = {
    Name = "mission_link_rule_bet"
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
  "source": ["mission_link"],
  "detail": {
    "action": ["success"]
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
  "source": ["mission_link"],
  "detail": {
    "action": ["fail"]
  }
}
PATTERN

  tags = {
    Name = "mission_link_rule_fail"
    project = "MissionLink"
  }
}

# EventBridge가 bat_lambda를 호출하기 위한 권한 생성
resource "aws_lambda_permission" "allow_cloudwatch_bet_lambda" {
  statement_id = "AllowExecutionFromCloudWatch"
  action = "lambda:InvokeFunction"
  function_name = module.mission_link_bet_lambda.lambda_function_name
  principal = "events.amazonaws.com"
  source_arn = aws_cloudwatch_event_rule.bet.arn
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

# EventBridge에 bet 람다 타겟 연결 
resource "aws_cloudwatch_event_target" "lambda_target_bet" {
  arn = module.mission_link_bet_lambda.lambda_function_arn
  rule = aws_cloudwatch_event_rule.bet.name
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