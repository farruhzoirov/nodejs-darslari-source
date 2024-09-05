import {NextFunction, Request, Response} from 'express';
import Joi, {ValidationError} from "joi";

const schema = Joi.object( {
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = await schema.validateAsync(req.body);
        next()
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(400).send({
                ok: false,
                error: err?.details[0]?.message,
            });
        } else {
            res.status(500).send({
                ok: false,
                error: "Internal server error",
            });
        }
    }
}