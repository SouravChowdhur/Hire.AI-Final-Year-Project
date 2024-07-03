import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
      return next(new ErrorHandler("Please fill full form!"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return next(new ErrorHandler("Email already registered!"));
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
    });
    sendToken(user, 201, res, "User Registered!");
  });