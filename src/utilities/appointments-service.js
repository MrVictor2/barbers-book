import sendRequest from "./send-request";
import { getUser, getUserById } from "./users-service";
import { getServiceById } from "./services-service";

const BASE_URL = "/api/appointments";

// Function to format date to YYYY-MM-DD
function formatDate(dateString) {
  console.log("Formatting date:", dateString);
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  console.log("Formatted date:", formattedDate);
  return formattedDate;
}

export async function createAppointment(appointmentData) {
  try {
    const createdAppointment = await sendRequest(
      BASE_URL,
      "POST",
      appointmentData
    );
    return createdAppointment;
  } catch (error) {
    throw new Error("Error creating appointment");
  }
}

export async function getMyAppointments() {
  console.log("**************************");
  try {
    const user = getUser(); // Get the logged-in user

    // If the user is logged in
    if (user) {
      // If the user is a customer, fetch appointments made by the customer
      if (user.type === "customer") {
        const appointments = await sendRequest(BASE_URL);

        // Fetch details for each appointment
        const appointmentsWithDetails = await Promise.all(
          appointments.map(async (appointment) => {
            // Fetch barber details
            const barber = await getUserById(appointment.barber);

            // Fetch service details for each service ID
            const servicePromises = appointment.services.map((serviceId) =>
              getServiceById(serviceId)
            );
            const services = await Promise.all(servicePromises);

            // Format appointmentDate to YYYY-MM-DD
            const formattedDate = formatDate(appointment.appointmentDate);
            console.log("Testing customer date");

            return {
              ...appointment,
              barber,
              services,
              appointmentDate: formattedDate,
            };
          })
        );

        return appointmentsWithDetails;
      }

      // If the user is a barber, fetch appointments where the barbers ID matches the logged-in user's ID
      if (user.type === "barber") {
        const appointments = await sendRequest(BASE_URL);

        // Fetch details for each appointment
        const appointmentsWithDetails = await Promise.all(
          appointments.map(async (appointment) => {
            // Fetch customer details
            const customer = await getUserById(appointment.customer);

            // Fetch barber details
            const barber = await getUserById(appointment.barber);

            // Fetch service details for each service ID
            const servicePromises = appointment.services.map((serviceId) =>
              getServiceById(serviceId)
            );
            const services = await Promise.all(servicePromises);

            // Format appointmentDate to YYYY-MM-DD
            const formattedDate = formatDate(appointment.appointmentDate);
            console.log("Testing barber date");
            return {
              ...appointment,
              barber,
              services,
              customer,
              appointmentDate: formattedDate,
            };
          })
        );

        return appointmentsWithDetails;
      }
    }

    return []; // Return an empty array if the user is not logged in
  } catch (error) {
    throw new Error("Error fetching appointments");
  }
}
