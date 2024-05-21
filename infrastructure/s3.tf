module "s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "4.1.2"

  bucket = "hursthotel"

  force_destroy = true

  tags = local.tags

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