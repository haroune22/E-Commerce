const router = require('express').Router()

const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAndAdmin,
} = require("../VerifyToken");

const Cart = require("../models/Cart");

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Product(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch {}
});

router.put("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch {}
});

router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart Deleted");
  } catch {}
});

router.get("/find/:id",verifyTokenAuthorization, async (req, res) => {
  try {
    const Cart = await 
    Cart.findOne({userId:req.params.userId});

    res.status(200).json(Cart);
  } catch {}
});

//get all product
router.get("/", verifyTokenAndAdmin,async (req, res) => {
  try{
    const Carts= await Cart.find()
    res.status(200).json(Carts);
  } catch {}
});

module.exports = router