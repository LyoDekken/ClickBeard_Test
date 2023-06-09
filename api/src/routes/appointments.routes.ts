import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';


const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


appointmentsRouter.get('/', (request,response) => {
  const appointments = appointmentsRepository.findAll();
  return response.json(appointments);
})

appointmentsRouter.post('/', (request, response) => {

  try{
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);
    const CreateAppointment = new CreateAppointmentService(appointmentsRepository);
    const appointment = CreateAppointment.run({provider, date: parsedDate})

    return response.json(appointment);

  } catch (err) {
    return response.status(400);
  }

});

export default appointmentsRouter;
