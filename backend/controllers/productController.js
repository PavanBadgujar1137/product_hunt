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

    // Check if file exists and is accessible
    try {
      await fs.promises.access(imagePath, fs.constants.R_OK);
    } catch (error) {
      console.error(`[CREATE PRODUCT] File access error: ${error.message}`);
      return res.status(400).json({
        message: "Image file is not accessible. Please try uploading again.",
      });
    }

    // Upload image to Cloudinary
    console.log(`[CREATE PRODUCT] Uploading image: ${imagePath}`);
    const imageUpload = await uploadOnCloudinary(imagePath);

    if (!imageUpload) {
      console.error("[CREATE PRODUCT] Failed to upload image to Cloudinary");
      return res.status(500).json({
        message: "Failed to upload image. Please try again.",
      });
    }

    console.log(
      `[CREATE PRODUCT] Image upload successful: ${imageUpload.secure_url}`
    );

    // Create product with Cloudinary URL
    const newProduct = await Product.create({
      name,
      tagline,
      description,
      websiteUrl,
      category,
      imageUrl: imageUpload.secure_url,
      submittedBy: userId,
    });

    // Clean up local file after successful upload
    try {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`[CREATE PRODUCT] Local file cleaned up: ${imagePath}`);
      }
    } catch (error) {
      console.warn(
        `[CREATE PRODUCT] Failed to clean up local file: ${error.message}`
      );
      // Don't return error here as the product was created successfully
    }

    res.status(201).json({
      success: true,
      product: newProduct,
    });
  } catch (error) {
    console.error("[CREATE PRODUCT] Error:", error);

    // Clean up local file if it exists
    if (req.file?.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log(
          `[CREATE PRODUCT] Cleaned up local file after error: ${req.file.path}`
        );
      } catch (cleanupError) {
        console.warn(
          `[CREATE PRODUCT] Failed to clean up local file after error: ${cleanupError.message}`
        );
      }
    }

    res.status(500).json({
      message: "Failed to create product. Please try again.",
    });
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

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin only)
const updateProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(`[UPDATE PRODUCT] User: ${userId}, Role: ${req.user.role}`);

    if (req.user.role !== "admin") {
      console.warn(`[UPDATE PRODUCT] Forbidden: User ${userId} is not admin`);
      return res
        .status(403)
        .json({ message: "Only admins can update products." });
    }

    const { name, tagline, description, websiteUrl, category } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields if provided
    if (name) product.name = name;
    if (tagline) product.tagline = tagline;
    if (description) product.description = description;
    if (websiteUrl) product.websiteUrl = websiteUrl;
    if (category) product.category = category;

    // Handle image update if new image is provided
    if (req.file?.path) {
      try {
        const imageUpload = await uploadOnCloudinary(req.file.path);
        if (imageUpload) {
          product.imageUrl = imageUpload.secure_url;
        }
        // Clean up local file
        fs.unlinkSync(req.file.path);
      } catch (error) {
        console.error("[UPDATE PRODUCT] Image upload error:", error);
        return res.status(500).json({ message: "Failed to upload new image" });
      }
    }

    await product.save();
    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("[UPDATE PRODUCT] Error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(`[DELETE PRODUCT] User: ${userId}, Role: ${req.user.role}`);

    if (req.user.role !== "admin") {
      console.warn(`[DELETE PRODUCT] Forbidden: User ${userId} is not admin`);
      return res
        .status(403)
        .json({ message: "Only admins can delete products." });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("[DELETE PRODUCT] Error:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductBySlug,
  toggleUpvote,
  addComment,
  updateProduct,
  deleteProduct,
};
