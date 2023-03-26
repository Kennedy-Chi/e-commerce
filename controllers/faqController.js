const Faq = require("../models/faqModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const { findById } = require("../models/postModel");

exports.createFaq = catchAsync(async (req, res) => {
  let savedFields = {
    category: req.body.category,
    question: req.body.question,
    answer: req.body.answer,
  };

  const faq = await Faq.create(savedFields);
  res.status(200).json({
    status: "success",
    data: faq,
  });
});

exports.getFaq = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Faq.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const features = result.paginate();

  const faq = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: faq,
  });
});

exports.updateFaq = catchAsync(async (req, res, next) => {
  let allowedFields = {
    category: req.body.category,
    question: req.body.question,
    answer: req.body.answer,
  };

  const faq = await Faq.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  next();
});

exports.updateStatus = catchAsync(async (req, res, next) => {
  let allowedFields = {
    status: req.body.status,
  };

  const faq = await Faq.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
    data: faq,
  });
});

exports.deleteFaq = catchAsync(async (req, res, next) => {
  const faq = await Faq.findByIdAndDelete(req.params.id);

  if (!faq) {
    return next(new AppError("No faq found with that ID", 404));
  }

  next();
});
