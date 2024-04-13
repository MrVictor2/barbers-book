import sendRequest from './send-request';

const BASE_URL = '/api/appointments';

export async function createAppointment(appointmentData) {
  try {
    const createdAppointment = await sendRequest(BASE_URL, 'POST', appointmentData);
    return createdAppointment;
  } catch (error) {
    throw new Error('Error creating appointment');
  }
}
