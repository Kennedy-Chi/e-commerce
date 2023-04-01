const { token } = require("morgan");
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require("path");
const Sales = require("../models/salesModel");
const User = require("../models/userModel");
const Company = require("../models/companyModel");
const Item = require("../models/itemModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

hbs.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

const compile = async (templateName, data) => {
  const filePath = path.join(process.cwd(), "views", `${templateName}.hbs`);
  const html = await fs.readFile(filePath, "utf-8");
  return hbs.compile(html)(data);
};

exports.createSale = catchAsync(async (req, res, next) => {
  const data = req.body;
  let company = await Company.find();
  company = company[0];
  const names = new Set(data.cartItems.map((item) => item.name));
  const namesArray = Array.from(names);

  const description = [];

  names.forEach((el) => {
    const form = {
      name: el,
      price: 0,
      unitPrice: 0,
      quantity: 0,
    };
    data.cartItems.forEach((i) => {
      if (el == i.name) {
        form.quantity++;
        form.price = i.price;
        form.unitPrice = i.price;
      }
    });

    form.price = form.price * form.quantity;
    description.push(form);
  });

  const query = { name: { $in: namesArray } };
  const filteredItems = await Item.find(query);

  filteredItems.forEach((el) => {
    description.forEach((item) => {
      if (el.name == item.name) {
        if (data.isPurchase) {
          el.remaining[0] = item.quantity * 1 + el.remaining[0] * 1;
          el.status = "Good";
        } else {
          const totalRemainingUnits =
            el.remaining[1] + el.outputsPerInput * el.remaining[0];
          if (item.quantity > totalRemainingUnits) {
            return next(
              new AppError(
                `Sorry, you don't have any ${el.name} remaining to sell`,
                500
              )
            );
          } else {
            const newRemainingUnits = totalRemainingUnits - item.quantity;
            el.remaining.splice(
              0,
              1,
              Math.floor(newRemainingUnits / el.outputsPerInput)
            );
            el.remaining.splice(1, 1, newRemainingUnits % el.outputsPerInput);
            if (el.remaining[0] > 0) {
              el.status = "Good";
            } else if (
              el.remaining[0] == 0 &&
              el.remaining[1] > Math.floor(el.outputsPerInput / 2)
            ) {
              el.status = "Warning";
            } else if (
              el.remaining[0] == 0 &&
              el.remaining[1] < Math.floor(el.outputsPerInput / 2)
            ) {
              el.status = "Danger";
            } else if (el.remaining[0] == 0 && el.remaining[1] == 0) {
              el.status = "Exhaustive";
            }
          }
        }
      }
    });
  });

  data.description = description;
  data.companyName = company.companyName;
  data.companyAccountNumber = company.companyAccountNumber;
  data.companyAccountName = company.companyAccountName;
  data.companyBankName = company.companyBankName;
  data.companyAddress = company.media[0]?.text;
  data.companyPhone = company.media[2]?.text;
  data.companyEmail = company.systemEmail;

  company.invoiceNumber = company.invoiceNumber - 1;

  if (company.invoiceNumber < 0) {
    return next(
      new AppError(
        "No invoice number for this purchase please set invoice.",
        500
      )
    );
  }

  let number = company.invoiceNumber;

  let formattedNumber = number.toString();
  if (formattedNumber.length < 5) {
    formattedNumber = "0".repeat(5 - formattedNumber.length) + formattedNumber;
  }

  data.invoiceNumber = formattedNumber;
  let invoiceName = `${data.customerName}-${data.invoiceNumber}`;

  await Company.findByIdAndUpdate(
    company._id,
    { invoiceNumber: number },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  filteredItems.forEach(async (el) => {
    await Item.updateOne({ _id: el.id }, { $set: { remaining: el.remaining } });
  });
  const sale = await Sales.create(data);

  // try {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   page.setDefaultNavigationTimeout(60000);
  //   const content = await compile("invoice", data);

  //   await page.emulateMediaFeatures("screen");
  //   await page.setContent(content);
  //   await page.pdf({
  //     path: `uploads/${invoiceName}.pdf`,
  //     format: "A4",
  //     printBackground: true,
  //   });
  //   console.log("done");
  //   browser.close();
  // } catch (err) {
  //   return next(new AppError(err, 501));
  // }

  res.status(200).json({
    status: "success",
    // data: sale,
  });
});

exports.getAllSales = catchAsync(async (req, res, next) => {
  const result = new APIFeatures(Sales.find(), req.query)
    .filter()
    .sort()
    .limitFields();

  const resultLen = await result.query;

  const features = result.paginate();

  const sales = await features.query.clone();

  // Assuming RESULT contains the array of filtered documents
  const totalAmount = sales.reduce((acc, curr) => acc + curr.totalAmount, 0);

  res.status(200).json({
    status: "success",
    resultLength: resultLen.length,
    data: sales,
    totalAmount: totalAmount,
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

  next();
});

exports.deleteAllSales = catchAsync(async (req, res, next) => {
  await Sales.deleteMany(req.params.id);

  res.status(200).json({
    status: "success",
  });
});
