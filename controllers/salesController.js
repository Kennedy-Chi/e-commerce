const { token } = require("morgan");
const Sales = require("../models/salesModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.createOrder = catchAsync(async (req, res) => {
  let savedFields = {
    description: req.body.description,
    price: req.body.price,
    day: req.body.day,
    customer: req.body.customer,
    customerId: req.body.customerId,
    time: req.body.time,
  };

  console.log(savedFields);

  // const saveSales = async (description, price, el) => {
  //   for (let i = 0; i < req.body.salesPoint.length; i++) {
  //     if (el == req.body.salesPoint[i]) {
  //       description.push(req.body.description[i]);
  //       price += req.body.eachPrice[i];
  //     }
  //   }

  //   const salesField = {
  //     description: description,
  //     price: price,
  //     day: req.body.day,
  //     customer: req.body.customer,
  //     customerId: req.body.customerId,
  //     time: req.body.time,
  //     salesPoint: el,
  //   };

  //   const sales = await Sales.create(salesField);
  // };

  // const salesPointSet = new Set(req.body.salesPoint);

  // salesPointSet.forEach((el) => {
  //   let description = [];
  //   let price = 0;
  //   saveSales(description, price, el);
  // });

  // const order = await Order.create(savedFields);

  res.status(200).json({
    status: "success",
    // data: order,
  });
});

exports.getAllSales = catchAsync(async (req, res, next) => {
  // 1A) FILTERING

  // 2) SORTING

  // 3) FIELDS

  // 4) PAGINATION

  const result = new APIFeatures(Sales.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const management = ["Manager", "Auditor", "Accountant"];

  const staffs = ["Bar", "Pool Bartender", "Reception", "Restaurant"];

  let paid;

  let post;

  if (management.includes(req.query.staffType)) {
    paid = await Sales.aggregate([
      { $match: { transaction: true } },
      { $group: { _id: null, amount: { $sum: "$price" } } },
    ]);
  } else if (staffs.includes(req.query.staffType)) {
    paid = await Sales.aggregate([
      { $match: { transaction: true, salesPoint: req.query.staffType } },
      { $group: { _id: null, amount: { $sum: "$price" } } },
    ]);
  } else if (req.query.customerId != undefined) {
    paid = await Sales.aggregate([
      { $match: { transaction: true, customerId: req.query.customerId } },
      { $group: { _id: null, amount: { $sum: "$price" } } },
    ]);
  }

  if (management.includes(req.query.staffType)) {
    post = await Sales.aggregate([
      { $match: { transaction: false } },
      { $group: { _id: null, amount: { $sum: "$price" } } },
    ]);
  } else if (staffs.includes(req.query.staffType)) {
    post = await Sales.aggregate([
      { $match: { transaction: false, salesPoint: req.query.staffType } },
      { $group: { _id: null, amount: { $sum: "$price" } } },
    ]);
  } else if (req.query.customerId != undefined) {
    post = await Sales.aggregate([
      { $match: { transaction: false, customerId: req.query.customerId } },
      { $group: { _id: null, amount: { $sum: "$price" } } },
    ]);
  }

  const features = result.paginate();

  const sales = await features.query.clone();

  res.status(200).json({
    status: "success",
    resultLength: resultLen.length,
    data: sales,
    paid: paid,
    post: post,
  });
});

exports.updateSales = (io, socket) => {
  socket.on("updateSales", async (body) => {
    const user = await User.findById(body.userId);
    const form = {
      status: body.status,
    };

    if (user.activeRoom) {
      form.customer = user.activeRoom;
    }
    const updatedSales = await Sales.findByIdAndUpdate(body.foodId, form, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    io.emit("updatedSales", updatedSales);
  });
};

exports.deleteSales = catchAsync(async (req, res, next) => {
  const sales = await Sales.findByIdAndDelete(req.params.id);

  if (!sales) {
    return next(new AppError("No sales found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: sales,
  });
});

exports.deleteAllSales = catchAsync(async (req, res, next) => {
  await Sales.deleteMany(req.params.id);

  res.status(200).json({
    status: "success",
  });
});
