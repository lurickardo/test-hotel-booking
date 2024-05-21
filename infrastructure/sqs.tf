module "sqs-bookings" {
  source  = "terraform-aws-modules/sqs/aws"
  version = "4.2.0"

  name = "bookings"

  fifo_queue = true

  tags = local.tags
}

module "sqs-bookingNotifications" {
  source  = "terraform-aws-modules/sqs/aws"
  version = "4.2.0"

  name = "bookingNotifications"

  fifo_queue = true

  tags = local.tags
}
