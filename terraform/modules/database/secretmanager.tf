# Creating a AWS secret for database master account (Masteraccoundb)
resource "aws_secretsmanager_secret" "db_password" {
  name = "mission_link_secret.db_rds_password"
  recovery_window_in_days = 0
}

# Creating a AWS secret versions for database master account (Masteraccoundb)
resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id = aws_secretsmanager_secret.db_password.id
  secret_string = var.password
}

# Importing the AWS secrets created previously using arn.
data "aws_secretsmanager_secret" "db_password" {
  arn = aws_secretsmanager_secret.db_password.arn
}

# Importing the AWS secret version created previously using arn.
data "aws_secretsmanager_secret_version" "db_password" {
  secret_id = data.aws_secretsmanager_secret.db_password.id
}

# After importing the secrets storing into Locals
locals {
  db_creds = data.aws_secretsmanager_secret_version.db_password.secret_string
}

# secret_policy_document 생성
data "aws_iam_policy_document" "secret_iam" {
  statement {
    sid    = "EnableAnotherAWSAccountToReadTheSecret"
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = ["secretsmanager:GetSecretValue"]
    resources = ["*"]
  }
}

# secret_policy 연결
resource "aws_secretsmanager_secret_policy" "secret_iam_policy" {
  secret_arn = aws_secretsmanager_secret.db_password.arn
  policy     = data.aws_iam_policy_document.secret_iam.json
}

