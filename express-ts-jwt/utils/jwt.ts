import jwt from 'jsonwebtoken';
import { IUser } from '../models/users';

export const createToken = (user: IUser): string => {
    return jwt.sign({
        _id: user._id,
        email: user.email
    },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1d',
        }
    )
}


