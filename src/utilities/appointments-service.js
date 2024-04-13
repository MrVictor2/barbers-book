import sendRequest from './send-request';
import { getUser, getUserById } from './users-service'; 
import { getServiceById } from './services-service';
const BASE_URL = '/api/appointments';

export async function createAppointment(appointmentData) {
  try {
    const createdAppointment = await sendRequest(BASE_URL, 'POST', appointmentData);
    return createdAppointment;
  } catch (error) {
    throw new Error('Error creating appointment');
  }
}

export async function getMyAppointments() {
  try {
    const user = getUser(); // Get the logged-in user

    // If the user is logged in
    if (user) {
      // If the user is a customer, fetch appointments made by the customer
      if (user.type === 'customer') {
        const appointments = await sendRequest(BASE_URL);
        
        // Fetch details for each appointment
        const appointmentsWithDetails = await Promise.all(appointments.map(async (appointment) => {
          // Fetch barber details
          const barber = await getUserById(appointment.barber);
          
          // Fetch service details for each service ID
          const servicePromises = appointment.services.map(serviceId => getServiceById(serviceId));
          const services = await Promise.all(servicePromises);
          
          return {
            ...appointment,
            barber,
            services
          };
        }));
        
        return appointmentsWithDetails;
      }
      
      // If the user is a barber, fetch appointments where the barber's ID matches the logged-in user's ID
      if (user.type === 'barber') {
        const barberAppointments = await sendRequest(`${BASE_URL}?barber=${user._id}`);
        
        // Fetch details for each appointment
        const appointmentsWithDetails = await Promise.all(barberAppointments.map(async (appointment) => {
          // Fetch customer details
          const customer = await getUserById(appointment.customer);
          
          // Fetch service details for each service ID
          const servicePromises = appointment.services.map(serviceId => getServiceById(serviceId));
          const services = await Promise.all(servicePromises);
          
          return {
            ...appointment,
            customer,
            services
          };
        }));

        return appointmentsWithDetails;
      }
    }

    return []; // Return an empty array if the user is not logged in
  } catch (error) {
    throw new Error('Error fetching appointments');
  }
}
