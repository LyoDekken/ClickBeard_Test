import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import auth  from "../../../../../shared/infra/http/middlewares/auth"
import ProfileController from '../controllers/ProfileController';
const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(auth);

profileRouter.get('/', profileController.show);

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string(),
        },
    }),
    profileController.update,
);



export default profileRouter;
