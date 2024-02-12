import Joi from "joi";

export const addNoteSchema = Joi.object({
  text: Joi.string().required(),
});
