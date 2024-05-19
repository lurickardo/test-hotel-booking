module "sqs-payment" {
  source  = "terraform-aws-modules/sqs/aws"
  version = "4.2.0"

  name = "hursthotel/paymentVouchers"

  fifo_queue = true

  tags = local.tags
}

module "sqs-bookings" {
  source  = "terraform-aws-modules/sqs/aws"
  version = "4.2.0"

  name = "hurstHotel/bookings"

  fifo_queue = true

  tags = local.tags
}