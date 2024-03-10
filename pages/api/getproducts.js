// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    let product = await Product.find()
    let products = {}
    for (let item of product) {
        if (item.title in products) {
            if (!products[item.title].color.includes(item.color) && item.availableQty > 0) {
                products[item.title].color.push(item.color)
            }
            if (!products[item.title].color.includes(item.size) && item.availableQty > 0) {
                products[item.title].size.push(item.size)
            }
        } else {
            products[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                products[item.title].color = [item.color]
                products[item.title].size = [item.size]
            }
        }
    }
    res.status(200).json({ products })
}

export default connectDb(handler)