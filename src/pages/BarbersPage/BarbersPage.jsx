import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBarbers } from "../../utilities/barbers-service";

function BarbersPage() {
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchBarbers = async () => {
      const barbersData = await getBarbers();
      setBarbers(barbersData);
    };

    fetchBarbers();
  }, []);

  function handleBarberSelection(barber) {
    setSelectedBarber(barber);
  }

  function handleServiceSelection(serviceId) {
    const isSelected = selectedServices.includes(serviceId);
    if (isSelected) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  }

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  async function handleCreateAppointment() {
    // try {
    //   const appointmentData = {
    //     barberId: selectedBarber.id,
    //     services: selectedServices,
    //     date: selectedDate
    //   };

    //   const response = await fetch('/api/appointments', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(appointmentData)
    //   });

    //   if (!response.ok) {
    //     throw new Error('Failed to create appointment');
    //   }

    //   // Reset the state after successful appointment creation
    //   setSelectedBarber(null);
    //   setSelectedServices([]);
    //   setSelectedDate('');
    //   alert('Appointment created successfully!');
    // } catch (error) {
    //   console.error('Error creating appointment:', error);
    //   alert('Failed to create appointment. Please try again.');
    // }
    alert("Appointment created");
  }

  async function toggleSelectedService() {
    alert("service selected");
  }

  return (
    <div className="barbers-page">
      <h2>Barbers</h2>
      <div className="barbers-container">
        {barbers.map((barber) => (
          <div className="barber-card" key={barber.id}>
            <img
              src="https://www.josephguinbarber.com/uploads/1/2/4/4/124499791/josephguinhome_orig.jpg"
              alt="Barber"
              className="barber-image"
            />
            <h3>{barber.name}</h3>
            <div className="services">
              {barber.services &&
                barber.services.map((service) => (
                  <div className="service-checkbox" key={service.id}>
                    <input
                      type="checkbox"
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onChange={() => toggleSelectedService(service.id)}
                    />
                    <label htmlFor={service.id}>{service.name}</label>
                  </div>
                ))}
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="date-selector"
            />
            <button
              onClick={handleCreateAppointment}
              className="create-appointment-btn"
            >
              Create Appointment
            </button>
          </div>
        ))}
      </div>
      <Link to="/appointments">Back to Appointments</Link>
    </div>
  );
}

export default BarbersPage;
