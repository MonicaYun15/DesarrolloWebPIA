const express = require("express");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController.js");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", protect, addExpense);
router.post("/get", protect, getAllExpense);
router.post("/downloadexcel", protect, deleteExpense);
router.post("/:id", protect, downloadExpenseExcel);

module.exports = router;