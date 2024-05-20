module "sqs-payment" {
  source  = "terraform-aws-modules/sqs/aws"
  version = "4.2.0"

  name = "paymentVouchers"

  fifo_queue = true

  tags = local.tags
}

module "sqs-bookings" {
  source  = "terraform-aws-modules/sqs/aws"
  version = "4.2.0"

  name = "bookings"

  fifo_queue = true

  tags = local.tags
}

module "sqs-notifications" {
  source  = "terraform-aws-modules/sqs/aws"
  version = "4.2.0"

  name = "notifications"

  fifo_queue = true

  tags = local.tags
}

module "sqs-notifications" {
  source  = "terraform-aws-modules/sqs/aws"
  version = "4.2.0"

  name = "bookingInfos"

  fifo_queue = true

  tags = local.tags
}
