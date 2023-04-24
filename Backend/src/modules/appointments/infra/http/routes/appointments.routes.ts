import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import auth  from "../../../../../shared/infra/http/middlewares/auth"
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(auth);

appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentsController.create,
);

appointmentsRouter.get(
    '/me',
    providerAppointmentsController.index,
);

appointmentsRouter.delete(
    '/delete',

    celebrate({
        [Segments.BODY]: {
            appointment_id: Joi.string().required(),
        },
    }),
    appointmentsController.delete,
);

export default appointmentsRouter;
