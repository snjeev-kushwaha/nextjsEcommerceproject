import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let result = Array.isArray(req.body) ? req.body : [req.body]
        
        for (let i = 0; i < result.length; i++) {
            let productData = result[i];
            let p = new Product({
                title:productData.title,
                slug:productData.slug,
                desc:productData.desc,
                img:productData.img,
                category:productData.category,
                size:productData.size,
                color:productData.color,
                price:productData.price,
                availableQty:productData.availableQty
            })
            await p.save();
        }
        res.status(200).json({ success: "success" })
    } else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler)