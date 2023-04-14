import Order from '../../models/Order';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
  // validate paytm checksum
  // update status nto Orders tabe after checking the transaction sttus
  let order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Paid" })

  // let order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Paid", paymentInfo: JSON.stringify(req.body) }) //For checking the payment info

  // initiate shipping
  //Redirect user to the order confirmation page
  // res.status(200).json({ body: req.body })
  res.redirect('/order', 200)
  // res.redirect('/order?id=' + order._id, 200)

  // if (req.body.STATUS == 'TXN_SUCCESS') {
  //   await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Paid", paymentInfo: JSON.stringify(req.body) })
  // } else if (req.body.STATUS == 'PENDING') {
  //   await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Pending", paymentInfo: JSON.stringify(req.body) })
  // }
}

export default connectDb(handler);