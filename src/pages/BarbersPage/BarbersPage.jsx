import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBarbers } from "../../utilities/barbers-service";
import { getServiceById } from "../../utilities/services-service";

function BarbersPage() {
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showServices, setShowServices] = useState(false); // Initially hide services

  useEffect(() => {
    const fetchBarbers = async () => {
      const barbersData = await getBarbers();
      setBarbers(barbersData);
    };

    fetchBarbers();
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
      setShowServices(false); // Hide services when barber is unselected
    } else {
      setSelectedBarber(barber);
      setShowServices(true); // Show services when barber is selected
      setSelectedServices([]); // Reset selected services
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
    // Your logic to create an appointment
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
            <label htmlFor={`selectBarber-${barber._id}`}>
              Select this Barber
            </label>
            <img
              src="https://www.josephguinbarber.com/uploads/1/2/4/4/124499791/josephguinhome_orig.jpg"
              alt="Barber"
              className="barber-image"
            />
            <h3>{barber.name}</h3>
            {selectedBarber === barber &&
              showServices && ( // Show services only if barber is selected and showServices is true
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
