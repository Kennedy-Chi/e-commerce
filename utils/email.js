const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const Sib = require("sib-api-v3-sdk");
const dotenv = require("dotenv");
const Transport = require("nodemailer-sendinblue-transport");
dotenv.config({ path: "../config.env" });

module.exports = class Email {
  constructor(user, banner, template, title, content) {
    this.to = user.email;
    this.template = template;
    this.title = title;
    this.content = content;
    this.fullName = user.fullName;
    this.url = banner;
    this.from = `Hotel kennytechstudios@gmail.com`;
  }

  // 1) SET CONFIGURATION
  transporter() {
    return nodemailer
      .createTransport(
        new Transport({
          apiKey: process.env.SENDINBLUE_KEY,
        })
      )
      .use(
        "compile",
        hbs({
          viewEngine: {
            partialsDir: path.join(__dirname, "../views/partials"),
            layoutsDir: "../views/layouts",
            defaultLayout: "",
          },
          viewPath: "views",
          extName: ".hbs",
        })
      );
  }

  // 2) SEND EMAIL
  send(template, subject) {
    console.log(template, subject);
    this.transporter()
      .sendMail({
        from: process.env.SENDINBLUE_EMAIL, // sender address
        to: this.to, // list of recipients
        subject: subject, // Subject line
        template: template,
        context: {
          banner: this.url,
          content: this.content,
          fullName: this.fullName,
        },
      })
      .then((res) => {
        console.log("sent successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendEmail() {
    this.send(`${this.template}`, `${this.title}`);
  }

  sendForgottenPassword() {
    this.send("password", "Reset password");
  }

  sendWelcome() {
    this.send("welcome", "Login Notification");
  }
};
