import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from "../models/users";
import { AuthRequest } from "../common/interface/AuthRequest";
import { createToken } from "../utils/jwt";
import { handleError } from "../utils/errorHandler";

export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = req.body as AuthRequest['body'];

        const isEmailExist = await User.findOne({ email });

        if (isEmailExist) {
            res.status(400).json({
                ok: false,
                message: "Email already exists",
            });
            return;
        }

        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = createToken(newUser);

        res.status(201).json({
            status: 201,
            ok: true,
            message: "User registered successfully",
            token: token,
        });

    } catch (error) {
        handleError(res, error, 'Register Controller');
        next(error);
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body as AuthRequest['body'];

        const isUserExist = await User.findOne({ email });

        if (!isUserExist) {
            res.status(400).json({
                ok: false,
                message: "User not registered",
            });
            return;
        }

        const isPasswordMatches = await bcrypt.compare(password, isUserExist.password);

        if (!isPasswordMatches) {
            res.status(400).json({
                ok: false,
                message: "Password doesn't match",
            });
            return;
        }

        const token = createToken(isUserExist);
        res.status(200).json({
            status: 200,
            ok: true,
            message: "User logged in successfully",
            token: token,
        });

    } catch (error) {
        handleError(res, error, 'Login Controller');
        next(error);
    }
};

export const getDataController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.status(200).json({
            ok: true,
            message: 'Data Controller',
        });
    } catch (error) {
        handleError(res, error, 'Get Data Controller');
        next(error);
    }
};