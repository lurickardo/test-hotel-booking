module "s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "4.1.2"

  bucket = "hursthotel"

  force_destroy = true

  tags = local.tags

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::hursthotel/bookingsinfo/*"
    }
  ]
}
POLICY

  lifecycle_rule = [
    {
      id      = "standard-ia-rule"
      enabled = true

      filter = {
        prefix = "/"
      }

      transition = [
        {
          days          = 30
          storage_class = "ONEZONE_IA"
          }, {
          days          = 300
          storage_class = "GLACIER"
        }
      ]
    }
  ]
}
