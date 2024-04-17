import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBarbers } from "../../utilities/barbers-service";
import { getServiceById } from "../../utilities/services-service";
import { getUser, getUserById } from "../../utilities/users-service";
import { createAppointment } from "../../utilities/appointments-service";

function BarbersPage() {
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Initially set as empty
  const [showServices, setShowServices] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBarbers = async () => {
      const barbersData = await getBarbers();
      setBarbers(barbersData);
    };

    fetchBarbers();
    const currentDate = new Date().toISOString().slice(0, 16); // Format current date and time
    setSelectedDate(currentDate); // Set default date and time
  }, []);

  async function fetchServiceDetails(serviceIds) {
    const servicePromises = serviceIds.map((serviceId) =>
      getServiceById(serviceId)
    );
    const services = await Promise.all(servicePromises);
    return services;
  }

  async function handleBarberSelection(barber) {
    if (selectedBarber === barber) {
      setSelectedBarber(null);
      setShowServices(false);
    } else {
      setSelectedBarber(barber);
      setShowServices(true);
      setSelectedServices([]);
      const services = await fetchServiceDetails(barber.services);
      setSelectedServices(
        services.map((service) => ({ ...service, selected: false }))
      );
    }
  }

  function handleServiceSelection(serviceId) {
    setSelectedServices((prevServices) =>
      prevServices.map((service) =>
        service._id === serviceId
          ? { ...service, selected: !service.selected }
          : service
      )
    );
  }

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  async function handleCreateAppointment() {
    if (!selectedBarber || selectedServices.length === 0 || !selectedDate) {
      alert("Please select a barber, services, and date.");
      return;
    }

    const customer = getUser();
    if (!customer) {
      console.error("User not logged in.");
      return;
    }

    const customerDetails = await getUserById(customer._id);
    const selectedServicesIds = selectedServices
      .filter((service) => service.selected)
      .map((service) => service._id);

    const appointmentData = {
      customer: customer._id,
      customerName: customerDetails.name,
      barber: selectedBarber._id,
      appointmentDate: selectedDate,
      services: selectedServicesIds,
    };

    try {
      await createAppointment(appointmentData);
      alert("Appointment created successfully!");
      navigate("/appointments");
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  }

  return (
    <div className="barbers-page">
      <h2>Barbers</h2>
      <div className="barbers-container">
        {barbers.map((barber) => (
          <div className="barber-card" key={barber._id}>
            <input
              type="checkbox"
              id={`selectBarber-${barber._id}`}
              checked={selectedBarber === barber}
              onChange={() => handleBarberSelection(barber)}
            />
            <label htmlFor={`selectBarber-${barber._id}`}>Select this Barber</label>
            <img
              src="https://www.josephguinbarber.com/uploads/1/2/4/4/124499791/josephguinhome_orig.jpg"
              alt="Barber"
              className="barber-image"
            />
            <h3>{barber.name}</h3>
            {selectedBarber === barber && showServices && (
              <div className="services">
                {selectedServices.map((service) => (
                  <div className="service-checkbox" key={service._id}>
                    <input
                      type="checkbox"
                      id={service._id}
                      checked={service.selected}
                      onChange={() => handleServiceSelection(service._id)}
                    />
                    <label htmlFor={service._id}>
                      {service.name} - Price: {service.price}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={handleDateChange}
              className="date-time-selector"
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
      <Link to="/appointments">Back to My Appointments</Link>
    </div>
  );
}

export default BarbersPage;
