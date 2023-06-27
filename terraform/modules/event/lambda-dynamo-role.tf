resource "aws_iam_role_policy" "dynamodb_lambda_policy_bet" {
  name   = "lambda-dynamodb-policy"
  role   = module.mission_link_bet_lambda.lambda_role_name
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Sid": "AllowLambdaFunctionInvocation",
        "Effect": "Allow",
        "Action": [
            "lambda:InvokeFunction"
        ],
        "Resource": "*"
    },
    {
        "Sid": "APIAccessForDynamoDBStreams",
        "Effect": "Allow",
        "Action": [
            "dynamodb:*" 
        ],
        "Resource": "*"
    },
     {
        "Sid": "APIAccessForPutEvents",
        "Effect": "Allow",
        "Action": [
           "events:*"
        ],
        "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "dynamodb_lambda_policy_success" {
  name   = "lambda-dynamodb-policy"
  role   = module.mission_link_success_lambda.lambda_role_name
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Sid": "AllowLambdaFunctionInvocation",
        "Effect": "Allow",
        "Action": [
            "lambda:InvokeFunction"
        ],
        "Resource": "*"
    },
    {
        "Sid": "APIAccessForDynamoDBStreams",
        "Effect": "Allow",
        "Action": [
            "dynamodb:*" 
        ],
        "Resource": "*"
    },
     {
      "Sid": "APIAccessForPutEvents",
      "Effect": "Allow",
      "Action": [
        "events:*"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "dynamodb_lambda_policy_fail" {
  name   = "lambda-dynamodb-policy"
  role   = module.mission_link_fail_lambda.lambda_role_name
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Sid": "AllowLambdaFunctionInvocation",
        "Effect": "Allow",
        "Action": [
            "lambda:InvokeFunction"
        ],
        "Resource": "*"
    },
    {
        "Sid": "APIAccessForDynamoDBStreams",
        "Effect": "Allow",
        "Action": [
            "dynamodb:*" 
        ],
        "Resource": "*"
    },
     {
      "Sid": "APIAccessForPutEvents",
      "Effect": "Allow",
      "Action": [
        "events:PutEvents"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}