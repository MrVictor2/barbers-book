export async function getServiceById(serviceId) {
  try {
    const response = await fetch(`/api/services/${serviceId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch service by ID');
    }
    const service = await response.json();
    return service;
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    throw error;
  }
}
