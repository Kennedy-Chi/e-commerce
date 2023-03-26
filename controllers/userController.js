const { token } = require("morgan");
const User = require("../models/userModel");
const RoomHistory = require("../models/roomHistoryModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // 1A) FILTERING

  // 2) SORTING

  // 3) FIELDS

  // 4) PAGINATION

  const result = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const users = await features.query.clone();

  res.status(200).json({
    status: "success",
    resultLength: resultLen.length,
    data: users,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const token = req.body.token;
  //1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword",
        400
      )
    );
  }

  //2) Update user docoment
  //const filteredBody = filterObj(req.body, "username", "email");
  const allowedFields = {
    fullName: req.body.fullName,
  };

  if (req.file) {
    allowedFields.profilePicture = req.file.filename;
  }

  const user = await User.findByIdAndUpdate(req.user.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.user = user;
  req.token = token;
  next();
});

exports.editReview = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { review: req.body.review },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    status: "success",
    token: req.token,
    data: {
      user,
    },
  });
});

exports.reviewStatus = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { reviewStatus: req.body.status },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    status: "success",
    token: req.token,
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getReviews = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(
    User.find({
      "review.subject": { $exists: true, $ne: "" },
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const users = await features.query.clone();

  res.status(200).json({
    status: "success",
    results: resultLen.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.editUser = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  const oldUser = await User.findById(req.params.id);

  let allowedFields = {
    staffType: req.body.staffType,
    status: req.body.status,
    fullName: req.body.fullName,
    reviewStatus: req.body.reviewStatus,
    review: req.body.review,
    rating: req.body.rating,
  };

  if (req.file) {
    allowedFields.profilePicture = req.file.filename;
    req.fileNames = oldUser.profilePicture;
  }

  const user = await User.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  req.user = user;

  next();
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  next();
});

exports.resetUsers = catchAsync(async (req, res, next) => {
  await User.updateMany(
    {},
    { $set: { activeRoom: "", bookedRooms: [], expenses: 0, postBill: 0 } }
  );

  await RoomHistory.deleteMany({});

  res.status(200).json({ status: "success" });
});
