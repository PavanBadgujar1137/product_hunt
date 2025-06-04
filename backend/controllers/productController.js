const Product = require("../models/Product");
const { uploadOnCloudinary } = require("../config/cloudinary");
const fs = require("fs");

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin only)
const createProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(`[CREATE PRODUCT] User: ${userId}, Role: ${req.user.role}`);

    if (req.user.role !== "admin") {
      console.warn(`[CREATE PRODUCT] Forbidden: User ${userId} is not admin`);
      return res
        .status(403)
        .json({ message: "Only admins can submit products." });
    }

    const { name, tagline, description, websiteUrl, category } = req.body;
    const imagePath = req.file?.path;

    // Validate required fields
    if (!name || !tagline || !description || !websiteUrl || !category) {
      console.warn("[CREATE PRODUCT] Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!imagePath) {
      console.warn("[CREATE PRODUCT] Product image is required");
      return res.status(400).json({ message: "Product image is required" });
    }

    if (!fs.existsSync(imagePath)) {
      console.error(
        `[CREATE PRODUCT] File does not exist at path: ${imagePath}`
      );
      return res
        .status(400)
        .json({ message: "Image file not found on server." });
    }

    // Upload image to Cloudinary
    console.log(`[CREATE PRODUCT] Uploading image: ${imagePath}`);
    const imageUpload = await uploadOnCloudinary(imagePath);
    console.log(`[CREATE PRODUCT] Image upload response:`, imageUpload);
    const newProduct = await Product.create({
      name,
      tagline,
      description,
      websiteUrl,
      category,
      imageUrl: imageUpload?.secure_url || "",
      submittedBy: userId,
    });

    if (!newProduct) {
      console.error("[CREATE PRODUCT] Failed to create product");
      return res.status(500).json({ message: "Failed to create product" });
    }

    console.log(`[CREATE PRODUCT] Product created: ${newProduct._id}`);
    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("[CREATE PRODUCT] Server error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, sort = "-createdAt" } = req.query;
    const query = category ? { category } : {};

    const products = await Product.find(query)
      .sort(sort)
      .populate("submittedBy", "username")
      .populate("upvotes", "username");

    res.json({ products, message: "Products fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("submittedBy", "username")
      .populate("comments.user", "username");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Toggle upvote
// @route   POST /api/products/:id/upvote
// @access  Private (User only)
const toggleUpvote = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const userId = req.user._id;
    const upvoteIndex = product.upvotes.indexOf(userId);

    if (upvoteIndex === -1) {
      // Add upvote
      product.upvotes.push(userId);
      product.upvoteCount += 1;
    } else {
      // Remove upvote
      product.upvotes.splice(upvoteIndex, 1);
      product.upvoteCount -= 1;
    }

    await product.save();
    res.json({
      success: true,
      upvoteCount: product.upvoteCount,
      hasUpvoted: upvoteIndex === -1,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add comment
// @route   POST /api/products/:id/comments
// @access  Private (User only)
const addComment = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res
        .status(403)
        .json({ message: "Only users can comment on products." });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.comments.push({
      user: req.user._id,
      text: req.body.text,
    });

    await product.save();
    res.json({ message: "Comment added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductBySlug,
  toggleUpvote,
  addComment,
};
