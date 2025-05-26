const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController.js");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", protect, addIncome);
router.post("/get", protect, getAllIncome);
router.post("/downloadexcel", protect, deleteIncome);
router.post("/:id", protect, downloadIncomeExcel);

module.exports = router;
