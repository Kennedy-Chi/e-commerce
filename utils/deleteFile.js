const fs = require("fs");
const deleteFile = (req, res, next) => {
  let filenames = req.fileNames;
  if (!Array.isArray(filenames)) {
    filenames = new Array(filenames);
  }

  if (filenames.length != 0) {
    for (let i = 0; i < filenames.length; i++) {
      if (fs.existsSync(`uploads/${filenames[i]}`)) {
        console.log(filenames[i]);
        fs.unlinkSync(`uploads/${filenames[i]}`);
      }
    }
  }

  let user;
  if (req.user) {
    user = req.user;
  } else {
    user: "";
  }

  // res.status(200).json({
  //   status: "success",
  //   user,
  // });

  next();
};

module.exports = deleteFile;
