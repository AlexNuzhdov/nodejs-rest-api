const bcrypt = require('bcrypt');
const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

const register = async (req, res, next ) => {
    
    try {
        const { email, password, subscription } = req.body;
        const user = await  User.findOne({ email });
        if (user) {
            throw new Conflict(`Email ${email} in use`)
        }
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const avatarURL = gravatar.url(email);

        const verificationToken = nanoid();

        const newUser = await User.create({ email, password: hashPassword, avatarURL, subscription, verificationToken });

        const mail = {
            to: email,
            subject: "Подтверждение email",
            html: `<a "http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Подтвердить email</a>`
        };
        await sendEmail(mail);
        
        res.status(201).json({
            status: "succes",
            code: 201,
            data: {
                newUser: {
                    email,
                    subscription: "starter",
                    avatarURL,
                    verificationToken
                }
            }
        })
    } catch(error) {
      next(error);
 }
}

module.exports = register;