import { startOfHour, isBefore, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;

}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        user_id,
        date,

    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError(
                "You can't create an appointment on a past date",
            );
        }

        if (user_id === provider_id) {
            throw new AppError("You can't create an appointment with yourself");
        }

        const findMyAppoitmentInSameDate =
            await this.appointmentsRepository.findByDate(
                appointmentDate,
                user_id,
            );

        if (findMyAppoitmentInSameDate) {
            throw new AppError('Your appointment is already booked with our doctor');
        }

        const findAppoitmentInSameDate =
            await this.appointmentsRepository.findByDate(
                appointmentDate,
                provider_id,
            );

        if (findAppoitmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,

        });

        return appointment;
    }
}

export default CreateAppointmentService;
