const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  tagline: {
    type: String,
    required: [true, 'Tagline is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  websiteUrl: {
    type: String,
    required: [true, 'Website URL is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    // required: [true, 'Product image is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['AI', 'SaaS', 'Devtools', 'Productivity', 'Other']
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  upvoteCount: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Generate slug before saving
productSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Product', productSchema);