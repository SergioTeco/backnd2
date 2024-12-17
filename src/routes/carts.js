import { Router } from "express";
import { cartController } from "../controllers/cart.js";
import { authorization } from "../middlewares/authorization.js";
import { passportCall } from "../middlewares/passport.js";

// const cartController = new CartController();
const router = Router();

router.post("/", passportCall('jwt'), authorization("admin"), cartController.createCart);

router.get("/:cid",passportCall('jwt'),  authorization("user"), cartController.getCartById);

router.post("/:cid/product/:pid",passportCall('jwt'), authorization("user"), cartController.addProductToCart);

router.post("/:cid/purchase",passportCall('jwt'), authorization("user"), cartController.purchaseCart);

router.delete("/:cid/product/:pid", passportCall('jwt'), authorization("user"), cartController.deleteProductToCart);

router.put("/:cid/product/:pid", passportCall('jwt'), authorization("user"), cartController.updateQuantityProductInCart);

router.delete("/:cid", authorization("admin"), cartController.clearProductsToCart);

export default router;