import { uuid } from "uuidv4";
import { isEqual, getMonth, getYear, getDate } from "date-fns";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindAllInMonthFromProviderDTO from "@modules/appointments/dtos/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from "@modules/appointments/dtos/IFindAllInDayFromProviderDTO";

import Appointment from "../../infra/typeorm/entities/Appointment";
import IFindAllAppointments from "@modules/appointments/dtos/IFindAllAppointmentsDTO";
import IFindAllAppointmentsPatient from "@modules/appointments/dtos/IFindAllAppointmentsPatientDTO";
import IFindAllInDayFromProviderPatient from "@modules/appointments/dtos/IFindAllInDayFromProviderPatientDTO";

class AppointmentsRepository implements IAppointmentsRepository {
  findAllIAppointmentForDoctor({ provider_id, }: IFindAllAppointments): Promise<Appointment[]> {
      throw new Error("Method not implemented.");
  }
  findAllIAppointmentForPatient({ user_id, }: IFindAllAppointmentsPatient): Promise<Appointment[]> {
      throw new Error("Method not implemented.");
  }
  findByDatePatient(date: Date, user_id: string): Promise<Appointment | null | undefined> {
      throw new Error("Method not implemented.");
  }
  findAllInDayFromProviderPatient({ user_id, day, month, year, }: IFindAllInDayFromProviderPatient): Promise<Appointment[]> {
      throw new Error("Method not implemented.");
  }
  delete(appointment_id: string): Promise<void> {
      throw new Error("Method not implemented.");
  }
  private appointments: Appointment[] = [];

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      provider_id,
      user_id,
      date,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
