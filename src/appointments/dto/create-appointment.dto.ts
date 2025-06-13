export class CreateAppointmentDto {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  message?: string;
  projectType: string;
  address: {
    street: string;
    number: string;
    zipCode: string;
    neighborhood: string;
  };
} 