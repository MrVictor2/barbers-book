import React from 'react';
import { checkToken } from '../../utilities/users-service';

export default function OrderHistoryPage() {

    const handleCheckToken = async () => {
    try {
      // Invoke the checkToken function and consume the promise using await
      const expDate = await checkToken();
      // Log the expiration date to the console
      console.log(expDate);
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };

  return (
    <div>
    <div>
      <h1>Order History</h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </div>
    </div>
    
  );
}