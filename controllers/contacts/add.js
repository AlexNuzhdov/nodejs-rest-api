
const { Contacts } = require("../../models/contacts");

const add = async (req, res, next) => {

  try {
    const { _id } = req.user;
    const result = await Contacts.create({ ...req.body, owner: _id});
    res.status(201).json({
      status: "succes", 
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error); 
 }
}
module.exports = add;