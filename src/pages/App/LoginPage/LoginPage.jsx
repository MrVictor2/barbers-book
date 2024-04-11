import { Link } from 'react-router-dom';
import LoginForm from '../../../components/LoginForm/LoginForm';

export default function LoginPage({ setUser }) {
  return (
    <main>
      <div className='login-content-container'> 
      <div>
        <div className='signup-button-container'>
          <Link className="logo-cafe">
          NOTES
        </Link>
          <Link to="/signup" className='sign-up-link'>
          SIGN UP
        </Link>
        </div>
        </div>
         <div className="login-form-container">
        <h1>LOG IN</h1>
        <LoginForm setUser={setUser} />
      </div>
      </div>
    </main>
  );
}
