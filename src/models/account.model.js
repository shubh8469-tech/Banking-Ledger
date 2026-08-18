const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
      userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "User ID is required"],
            index: true, // Need to learn more about this and B-tree
      },
      status: {
            enum: ["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status can only be ACTIVE, FROZEN, or CLOSED",
      },
      currency: {
            type: String,
            required: [true, "Currency is required for creating an account"],
            default: "INR",
      },


}, { timestamps: true }
);

accountSchema.index({ userId: 1, status: 1 });

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;