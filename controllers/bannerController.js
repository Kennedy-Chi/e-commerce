const { token } = require("morgan");
const Banner = require("../models/bannerModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createBanner = catchAsync(async (req, res) => {
  let savedFields = {
    page: req.body.page,
    intro: req.body.intro,
    title: req.body.title,
  };

  if (req.file) {
    savedFields.image = req.file.filename;
  }

  const banner = await Banner.create(savedFields);

  res.status(200).json({
    status: "success",
    data: banner,
  });
});

exports.getAllBanner = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Banner.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const banner = await features.query.clone();

  res.status(200).json({
    status: "success",
    resultLength: resultLen.length,
    data: banner,
  });
});

exports.updateBanner = catchAsync(async (req, res, next) => {
  let filesToDelete = [];

  const oldBanner = await Banner.findById(req.params.id);

  let allowedFields = {
    page: req.body.page,
    intro: req.body.intro,
    title: req.body.title,
  };

  if (req.file) {
    allowedFields.image = req.file.filename;
  } else {
    allowedFields.picture = undefined;
  }

  await Banner.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (req.file) {
    filesToDelete.push(oldBanner.image);
  }

  req.fileNames = filesToDelete;
  next();
});

exports.updateBannerStatus = catchAsync(async (req, res, next) => {
  let allowedFields = {
    status: req.body.status,
  };
  const banner = await Banner.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
    data: banner,
  });
});

exports.deleteBanner = catchAsync(async (req, res, next) => {
  const oldBanner = await Banner.findById(req.params.id);
  let fileArr = [];
  const banner = await Banner.findByIdAndDelete(req.params.id);

  if (!banner) {
    return next(new AppError("No banner found with that ID", 404));
  }

  fileArr.push(oldBanner.image);
  req.fileNames = fileArr;

  next();
});
