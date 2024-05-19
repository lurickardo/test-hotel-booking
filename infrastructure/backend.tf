terraform {
  required_version = "~> 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.49"
    }
  }

  backend "s3" {
    bucket = "tf-remote-hurst"
    region = "us-east-1"
    key    = "infra/terraform.tfstate"
  }
}
