import sendRequest from "./send-request";
import { getUser, getUserById } from "./users-service";
import { getServiceById } from "./services-service";

const BASE_URL = "/api/appointments";

// Function to format date and time to YYYY-MM-DD HH:mm
function formatDate(dateString) {
  console.log("Formatting date and time:", dateString);
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
  console.log("Formatted date and time:", formattedDateTime);
  return formattedDateTime;
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
  try {
    const user = getUser(); // Get the logged-in user

    if (user) {
      const appointments = await sendRequest(BASE_URL);
      const appointmentsWithDetails = await Promise.all(
        appointments.map(async (appointment) => {
          const entityDetails = user.type === "customer" ?
            await getUserById(appointment.barber) : await getUserById(appointment.customer);
          const servicePromises = appointment.services.map(serviceId =>
            getServiceById(serviceId)
          );
          const services = await Promise.all(servicePromises);
          const formattedDate = formatDate(appointment.appointmentDate);

          return {
            ...appointment,
            entityDetails,
            services,
            appointmentDate: formattedDate,
          };
        })
      );

      return appointmentsWithDetails;
    }

    return [];
  } catch (error) {
    throw new Error("Error fetching appointments");
  }
}
