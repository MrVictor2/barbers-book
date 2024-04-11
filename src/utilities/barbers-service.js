import * as usersAPI from './users-api';

export async function getBarbers() {
  try {
    // Call the getUserByType function from usersAPI to fetch users with type 'barber'
    const barbers = await usersAPI.getUserByType('barber');
    console.log(barbers)
    return barbers;
  } catch (error) {
    // Handle errors if any
    console.error('Error fetching barbers:', error);
    throw error;
  }
}
