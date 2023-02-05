
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
    to: "fevoy94503@ekcsoft.com",
    from: "alexnuzhdov90@gmail.com",
    subject: "Новая заявка с сайта",
    html: "<p> C сайта пришла новая заявка <p>"
}