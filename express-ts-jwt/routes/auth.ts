import { Router, Request, Response, NextFunction } from 'express';
import { registerController, loginController, getDataController } from "../controller/auth";
import { authMiddleware } from "../middleware/auth.middleware";
import signupValidator from "../validators/signup.validator";
import signinValidator from "../validators/signin.validator";

const router = Router();

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler = (fn: AsyncRequestHandler) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

router.post('/auth/register', signupValidator, asyncHandler(registerController));
router.post('/auth/login', signinValidator, asyncHandler(loginController));
router.get('/data', authMiddleware, asyncHandler(getDataController));

export default router;