const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const pass = require("../playground");

const adminSchema = new mongoose.Schema({
  title: {
    type: String,
    uppercase: true,
    default: "Pharm",
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
    // make it title case
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
    // please if the mail actually exists add to validate
  },
  phone_number: {
    type: String,
    unique: true,
    required: true,
    minLength: 11,
    maxLength: 11,
  },
  avatar: {
    type: Buffer,
  },
  password: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Invalid Password");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
});

adminSchema.statics.findAdmin = async function (body) {
  const { username, password } = body;

  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new Error("unable to login");
  }
  const verifyPassword = await bcrypt.compare(password, admin.password);
  console.log(`----${pass()}------${admin.password}`);

  if (!verifyPassword) {
    return console.log("Find the solution");
  }
  console.log("Solution found");

  //   //
  //   const token = jwt.sign(
  //     { _id: admin._id.toString(), algorithm: 'RS256' },
  //     process.env.ADMINKEY,
  //     { expiresIn: '1h' }
  //   );
  //   admin.tokens = [];
  //   admin.tokens = admin.tokens.concat({ token });
  //   await admin.save();
  //   return { token };
};

adminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();

  delete adminObject.password;
  delete adminObject.qualification;
  delete adminObject.avatar;

  return adminObject;
};
adminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
