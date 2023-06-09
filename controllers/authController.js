const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Email = require("../models/emailModel");
const AppError = require("../utils/appError");
const SendEmail = require("../utils/email");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  if (!req.body.checked) {
    const users = await User.find({ email: req.body.email });
    if (users.length > 0) {
      return next(new AppError("Someone with this email already exist!", 500));
    }
  }

  const newUser = await User.create({
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
    salesPersonId: req.body.salesPersonId,
    phoneNumber: req.body.phoneNumber,
    autoRegister: !req.body.checked,
    password: req.body.password,
    cPassword: req.body.cPassword,
    review: { subject: "", rating: 3, content: "", date: Date.now },
    staffType: req.body.staffType,
  });

  const email = await Email.find({ template: "confirm-registration" });
  try {
    const resetToken = newUser.createPasswordResetToken();

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/furniture.com/?${resetToken}`;

    new SendEmail(
      newUser,
      email[0].banner,
      email[0].name,
      email[0].headerColore,
      email[0].footerColore,
      email[0].mainColore,
      email[0].warning,
      email[0].content,
      resetURL
    ).sendEmail();

    res.status(200).json({
      status: "success",
      data: "Open the message we sent to your email to complete resgistration.",
    });
  } catch (err) {
    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  //1) check if email and password exist
  if (!username || !password) {
    return next(new AppError("Please provide username and password!", 400));
  }

  //2) check if user exists && password is correct
  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //3) if everything is ok, send token to client
  createSendToken(user, 200, res);
});

exports.getAUser = catchAsync(async (req, res, next) => {
  let token;
  // let io = req.io;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // //3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next();

  // io.on("connection", (socket) => {
  //   callChat(io, socket);
  // });

  createSendToken(currentUser, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on Posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address", 404));
  }
  //2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `localhost:3000/?token=${resetToken}`;
    // const resetURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/vi/users/resetPassword/?token=${resetToken}`;

    new Email(user, resetURL).sendForgottenPassword();
    res.status(200).json({
      status: "success",
      message: "Please check your email to reset password",
    });
  } catch (err) {
    (user.passwordResetToken = undefined),
      (user.passwordResetExpires = undefined);
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  console.log(req.body, req.params);
  //1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2) If token has not expired, and there is a user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.cPassword = req.body.cPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  //3) Update changedPasswordAt property for the user

  //4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.validateUser = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // //3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next();

  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1) Get user based on the id

  const user = await User.findById(req.user.id).select("+password");

  //2) If token has not expired, and there is a user, set the new password
  if (!(await user.correctPassword(req.body.oldPassword, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }

  if (req.body.password != req.body.cPassword) {
    return next(new AppError("Your passwords do not match"));
  }
  user.password = req.body.password;
  user.cPassword = req.body.cPassword;

  await user.save();

  //3) Update changedPasswordAt property for the user

  //4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting the token and check if it exist
  let token;

  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith("Bearer")
  //   ) {
  //     token = req.headers.authorization.split(" ")[1];
  //   }

  //   if (!token) {
  //     return next(
  //       new AppError(
  //         "Sorry, you are not logged in! Please login to get access",
  //         401
  //       )
  //     );
  //   }

  //   //2) Verification of token
  //   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //   //3) Check if user still exists
  //   const currentUser = await User.findById(decoded.id);
  //   if (!currentUser)
  //     return next(new AppError("Sorry you no longer exist in the database", 401));

  //   //4) Check if user changed password after the token was issued
  //   if (currentUser.changedPasswordAfter(decoded.iat)) {
  //     return next(
  //       new AppError(`User recently changed password! Please login again`, 401)
  //     );
  //   }

  //   //GRANT ACCESS TO PROTECTED ROUTE
  //   req.user = currentUser;
  //   req.token = token;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.staffType)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
