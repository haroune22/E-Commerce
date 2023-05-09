const router = require('express').Router()

const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAndAdmin,
} = require("../VerifyToken");

const Order = require("../models/Order");

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch {}
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch {}
});

router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Deleted");
  } catch {}
});

router.get("/find/:userId", verifyTokenAuthorization, async (req, res) => {
  try {
    const Orders = await Order.find({ userId: req.params.userId });

    res.status(200).json(Orders);
  } catch {}
});

//get all product
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).json(Orders);
  } catch {}
});

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid
    const date= new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() -1))
    const previousMonth = new Date( new Date().setMonth(lastMonth.getMonth() -1))
    try{
        const income = await Order.aggregate([
            {
                $match:{createdAt:{$gte:previousMonth},...(productId && {
                  products:{$elemMatch:{productId}},
                })}
            },
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount",
                },
            },
                {
                    $group:{
                        _id:"$month",
                        totale:{$sum:"$sales"}
                    },
            },
        ]);
        res.status(200).json(income)
    }catch{}
})


module.exports = router