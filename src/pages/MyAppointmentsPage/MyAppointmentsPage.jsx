import React, { useState, useEffect } from "react";
import { getMyAppointments } from "../../utilities/appointments-service";
import { getUser } from "../../utilities/users-service"; // Import getUser

function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getUser(); // Get the logged-in user

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const fetchedAppointments = await getMyAppointments();
        setAppointments(fetchedAppointments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <div className="no-appointments">No appointments found.</div>
      ) : (
        <div>
          {appointments.map((appointment) => (
            <div key={appointment._id}>
              <h3>
                {/* Conditionally display barber or customer details */}
                {user.type === "customer"
                  ? `Barber: ${appointment.barber.name}`
                  : `Customer: ${appointment.customer.name}`}
              </h3>
              <p>Appointment Date: {appointment.appointmentDate}</p>
              <p>Services:</p>
              <ul>
                {appointment.services.map((service) => (
                  <li key={service._id}>{service.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointmentsPage;
