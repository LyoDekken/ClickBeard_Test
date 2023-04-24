import { Router } from "express";

import { Request, Response} from "express";

import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";
import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import providersRouter from "@modules/appointments/infra/http/routes/providers.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
    res.json("Welcome to ClickBeard")
})

routes.use("/sessions", sessionsRouter);
routes.use("/profile", profileRouter);
routes.use("/appointments", appointmentsRouter);
routes.use("/providers", providersRouter);
routes.use("/users", usersRouter);


export default routes;
