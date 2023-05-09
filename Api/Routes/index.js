const Router = require("express").Router()
const userRoutes = require("./Users")
const authRoutes = require("./auth")
const productsRoutes = require("./products")
const OrdersRoutes = require("./Orders")
const CartsRoutes = require("./Carts")
const StripeRoutes = require("./Stripe")



module.exports = () => {
    Router.use("/users",userRoutes)
    Router.use("/auth",authRoutes)
    Router.use("/products",productsRoutes)
    Router.use("/Orders",OrdersRoutes)
    Router.use("/Carts",CartsRoutes)
    Router.use("/Checkout",StripeRoutes)
    
    return Router;
}