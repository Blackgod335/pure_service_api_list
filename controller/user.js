import userModel from "../model/user.js";
import { verfiyemailModel } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sgmail from "@sendgrid/mail";
import process from 'process';

// User signup
const signUp = async (req) => {
  try {
    const { firstName, lastName, mobile, email, password, address } = req.body;
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return {
        status: "DUPLICATE",
        message: "This email is already here",
      };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createUser = await userModel.create({
      firstName,
      lastName,
      mobile,
      email,
      address,
      password: hashedPassword,
    });
    let token = jwt.sign(
      { userId: createUser._id },
      process.env.JWT_SECRET_KEY
    );
    return {
      message: "User created successfully",
      createUser: {
        userId: createUser._id,
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        mobile: createUser.mobile,
        email: createUser.email,
        address: createUser.address,
      },
      token: token,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

// User Login
const logIn = async (req) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return {
        status: "NOTFOUND",
        message: "User Not Found",
      };
    }
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      return {
        status: "INVALID",
        message: "Invalid Password",
      };
    }
    let token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET_KEY);
    return {
      message: "Hello User",
      userData: {
        userId: findUser.userId,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email: findUser.email,
        address: findUser.address,
      },
      token: token,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

// User set forgetPassword
const forgetPassword = async (req) => {
  try {
    const { email } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return {
        status: "NOTFOUND",
        message: "User Not Found",
      };
    }
    const code = crypto.randomBytes(3).toString("hex");
    await verfiyemailModel.deleteMany({ email });
    await verfiyemailModel.create({ email, code });
    sgmail.setApiKey(process.env.SENDGRID_API_KEY);
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "ForgetPassword Verfication",
      text: `Your verfication is ${code}`,
    };
    sgmail.send(mailOptions);
    return {
      message: "send otp successfully",
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

//User Set Password
const setPassword = async (req) => {
  try {
    const { email, code, password } = req.body;
    const check = await verfiyemailModel.findOne({
      email,
      code,
    });
    if (!check) {
      return {
        status: "INVALID",
        message: "code is wrong or verfication timeout",
      };
    }
    const hash = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hash);
    await userModel.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } }
    );
    await verfiyemailModel.findOneAndDelete({ email, code });
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

//User resetPassword
const resetPassword = async (req) => {
  try {
    const { email, password, newPassword, confirmPassword } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return {
        status: "NOTFOUND",
        message: "User Not Found",
      };
    }
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      return {
        status: "INVALID",
        message: "Invalid Password",
      };
    }
    if (!newPassword == confirmPassword) {
      return {
        status: "INVALID_1",
        message: "newPassword and confirmPassword doesn't match",
      };
    }
    const hash = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, hash);
    await userModel.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    return {
      message: "Successfully password set",
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

export { signUp, logIn, forgetPassword, setPassword, resetPassword };
