const Email = require("../models/emailModel");
const SendEmail = require("../utils/email");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createEmail = catchAsync(async (req, res) => {
  let savedFields = {
    title: req.body.title,
    template: req.body.template,
    content: req.body.content,
    banner: req.file.filename,
  };

  const email = await Email.create(savedFields);

  res.status(200).json({
    status: "success",
    data: email,
  });
});

exports.getEmails = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Email.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const features = result.paginate();

  const email = await features.query.clone();

  res.status(200).json({
    status: "success",
    data: email,
  });
});

exports.updateEmail = catchAsync(async (req, res, next) => {
  let filesToDelete = [];
  let allowedFields = {
    title: req.body.title,
    template: req.body.template,
    content: req.body.content,
  };

  if (req.file) {
    allowedFields.banner = req.file.filename;
    const oldEmail = await Email.findById(req.params.id);
    filesToDelete.push(oldEmail.banner);
  }

  const email = await Email.findByIdAndUpdate(req.params.id, allowedFields, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  req.fileNames = filesToDelete;

  next();
});

exports.sendEmail = catchAsync(async (req, res, next) => {
  const email = await Email.findById(req.params.id);

  req.body.forEach((user) => {
    try {
      const resetURL = `${req.protocol}://${req.get("host")}/maxmobihotels.com`;
      const banner = `${req.protocol}://${req.get("host")}/maxmobihotels.com/${
        email.banner
      }`;

      new SendEmail(
        user,
        banner,
        email.template,
        email.title,
        email.content
      ).sendEmail();
    } catch (err) {
      return next(
        new AppError(
          "There was an error sending the email. Try again later!",
          500
        )
      );
    }
  });

  res.status(200).json({
    status: "success",
    data: email,
  });
});

exports.deleteEmail = catchAsync(async (req, res, next) => {
  const filesToDelete = [];

  const email = await Email.findById(req.params.id);

  await Email.findByIdAndDelete(req.params.id);

  if (!email) {
    return next(new AppError("No email found with that ID", 404));
  }

  filesToDelete.push(email.banner);

  req.fileNames = filesToDelete;

  next();
});
