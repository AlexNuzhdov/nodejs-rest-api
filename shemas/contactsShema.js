const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  

});
const updateFavorit = Joi.object({
  favorite: Joi.boolean().required(),
});



module.exports = contactSchema,updateFavorit;