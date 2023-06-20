data "aws_caller_identity" "current" {}

# Create new SNS topic
resource "aws_sns_topic" "mission_link_success_SNSTopic" {
  name                      = "mission_link_success_sns"
  tags = {
    Name = "mission_link_success_sns"
    project = "MissionLink"
  }
}

# Create new SNS topic
resource "aws_sns_topic" "mission_link_fail_SNSTopic" {
  name                      = "mission_link_fail_sns"
  tags = {
    Name = "mission_link_fail_sns"
    project = "MissionLink"
  }
}

# Create SNS topic policy to allow Eventbridge to publish to the SNS topic
resource "aws_sns_topic_policy" "mission_link_sns_success_policy" {
  arn    = aws_sns_topic.mission_link_success_SNSTopic.arn
  policy = <<POLICY
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "events.amazonaws.com"
      },
      "Action": "sns:Publish",
      "Resource": "${aws_sns_topic.mission_link_success_SNSTopic.arn}",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "${aws_cloudwatch_event_rule.success.arn}"
        }
      }
    }
  ]
}
POLICY  
}

resource "aws_sns_topic_policy" "mission_link_sns_fail_policy" {
  arn    = aws_sns_topic.mission_link_fail_SNSTopic.arn
  policy = <<POLICY
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "events.amazonaws.com"
      },
      "Action": "sns:Publish",
      "Resource": "${aws_sns_topic.mission_link_fail_SNSTopic.arn}",
      "Condition": {
        "ArnEquals": {
          "aws:SourceArn": "${aws_cloudwatch_event_rule.fail.arn}"
        }
      }
    }
  ]
}
POLICY  
}


# Set the SNS topic as a target to the EventBridge rule.
resource "aws_cloudwatch_event_target" "mission_link_sns_RuleTarget_success" {
  rule = aws_cloudwatch_event_rule.success.name
  arn  = aws_sns_topic.mission_link_success_SNSTopic.arn
}

resource "aws_cloudwatch_event_target" "mission_link_sns_RuleTarget_fail" {
  rule = aws_cloudwatch_event_rule.fail.name
  arn  = aws_sns_topic.mission_link_fail_SNSTopic.arn
}

# display the Name and ARN of the SNS topic
output "SNS-success-Topic" {
  value       = aws_sns_topic.mission_link_success_SNSTopic.name
  description = "The SNS Topic Name"
}

output "SNS-fail-Topic" {
  value       = aws_sns_topic.mission_link_fail_SNSTopic.name
  description = "The SNS Topic ARN"
}

# sns 주제 구독 생성
resource "aws_sns_topic_subscription" "mission_link_success_email_subscription" {
  topic_arn = aws_sns_topic.mission_link_success_SNSTopic.arn
  protocol  = "email"
  endpoint  = var.endpoint_email
}

resource "aws_sns_topic_subscription" "mission_link_fail_email_subscription" {
  topic_arn = aws_sns_topic.mission_link_fail_SNSTopic.arn
  protocol  = "email"
  endpoint  = var.endpoint_email
}