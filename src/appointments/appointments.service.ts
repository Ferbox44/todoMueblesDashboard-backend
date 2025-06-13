import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  findAll() {
    return this.appointmentRepository.find({
      order: {
        date: 'DESC',
        time: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return this.appointmentRepository.findOneBy({ id });
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentRepository.update(id, updateAppointmentDto);
  }

  remove(id: string) {
    return this.appointmentRepository.delete(id);
  }
} 