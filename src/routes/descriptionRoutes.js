const express = require("express");
const cors = require("cors");
const {
  generateProductDescription,
} = require("../controllers/descriptionController");

const router = express.Router();
router.use(cors());

router.post("/generateDescription", generateProductDescription);

module.exports = router;
