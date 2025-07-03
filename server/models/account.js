import joi from "joi";

const accountSchema= joi.object({
    id: joi.string().required(),
    account_holder: joi.string().required(),
    sort_code: joi.string().required(),
    account_number: joi.string().required(),
    balance: joi.number().optional().default(0),
    pay: joi.number().min(0).optional().default(0),
    receive: joi.number().min(0).optional().default(0)
})

export default accountSchema;