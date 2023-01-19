const express = require("express");
const router = express.Router();
const { bagController } = require("./../controllers/bag");
const { protect } = require("./../middleware/auth");

router.post("/", protect, bagController.insert);
router.get("/", protect, bagController.getBag);
router.delete("/delete/:id", protect, bagController.delete);
router.delete("/delete/all", protect, bagController.deleteAll);
module.exports = router;
