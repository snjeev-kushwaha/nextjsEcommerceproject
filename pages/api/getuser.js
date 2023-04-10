import User from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async () => {
    let users = await User.find()
    res.status(200).json({ users })
    console.log(users)
}

export default connectDb(handler)