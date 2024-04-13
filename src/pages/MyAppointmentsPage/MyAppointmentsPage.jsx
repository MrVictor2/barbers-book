import React, { useState, useEffect } from "react";
import { getMyAppointments } from "../../utilities/appointments-service";

function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <div>No appointments found.</div>
      ) : (
        <div>
          {appointments.map((appointment) => (
            <div key={appointment._id}>
              <h3>Barber: {appointment.barber.name}</h3>
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
