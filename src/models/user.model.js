const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email: {
        
        type: String,
        required: [true, "Email is required for creating a account"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/],
        unique: [true, "Email alreeady exist"]
    },
    name: {
        type: String,
        required: [true, "Name is required for creating a account"]
    },
    password: {
        type: String,
        required: [true, "password is required for creating a account"],
        minLength: [6, "password is required for creating a account"],
        select: false
    },
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return;// next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    return;// next();
});

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

const usermodel = mongoose.model("user", userSchema);

module.exports = usermodel;