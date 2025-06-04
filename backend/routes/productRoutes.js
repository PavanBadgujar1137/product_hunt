const express = require("express");
const {
  createProduct,
  getProducts,
  getProductBySlug,
  toggleUpvote,
  addComment,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const upload = require("../middleware/multer"); // multer config
const { protect } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

// Protected routes
router.post("/", protect, upload.single("image"), createProduct);
router.post("/:id/upvote", protect, toggleUpvote);
router.post("/:id/comments", protect, addComment);

// Admin only routes
router.put("/:id", protect, upload.single("image"), updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
