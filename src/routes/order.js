const express = require("express");
const router = express.Router();
const { orderController } = require("./../controllers/order");
const { protect } = require("./../middleware/auth");

// router.get("/", orderController.getProduct);
router.post("/", protect, orderController.insert);
router.put("/status/:id", orderController.updateStatusOrder);
router.get("/", protect, orderController.getAllOrder);
router.get("/seller", protect, orderController.getOrderSeller);
router.get("/detail/:id", orderController.getDetailOrder);
// router.put("/:id", roleUser, orderController.update);
// router.delete("/:id", roleUser, orderController.delete);
// router.get("/searchID=:id", protect, orderController.search);

module.exports = router;