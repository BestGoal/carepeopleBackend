import { shiftListModel } from "../../models/index"

export const  getShift = async (req, res) => {
    let user = req.user
    let count = req.body.count

    console.log(user, count)

    let data = await shiftListModel.aggregate([
        {
            $match: {
                $and: [
                    {
                        clientid: user._id, status: "post"
                    }
                ]
            }
        },
        {
            $skip: 0
        },
        {
            $limit: count
        }
    ])
    if (data) {
        return res.json({ status: true, data: data })
    } else {
        return res.json({ status: false, data: "Failure" })
    }
}