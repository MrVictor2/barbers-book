import { Link } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';


export default function LoginPage({ setUser }) {
  return (
    <main>
      <div className='login-content-container'> 
        <div className='signup-button-container'>
          <Link className="logo-barber">
          BARBERS BOOK
        </Link>
          <Link to="/login" className='sign-up-link'>
          LOG IN
        </Link>
        </div>
         <div className="login-form-container">
        {/* <h1> SIGN UP</h1> */}
        <SignUpForm setUser={setUser} />
      </div>
      </div>
    </main>
  );
}
