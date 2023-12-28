import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import buildingImage from '../../img/building.jpg';
import logoImage from '../../img/logo.png';
import '../../App.css';
import LandlordService from '../../service/LandlordService';

export default function LandlordLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [landlord, setLandlord] = useState({
    landlordID: '',
    email:'',
    username: '',
    password: '',
    phone: '',
    firstName: '',
    lastName: ''
  })

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    LandlordService.findLandlordByUser(username).then((response)=>{
      setLandlord(response.data);
      if(landlord.password == password) {
        navigate("/landlord", {state: {landlord}});
      } else {
        alert("Invalid password");
      }
    }, ()=>{
      alert("Invalid username")
    })
  };
  

  return (
    <div>
      {/* Header */}


      {/* Main container */}
      <div className="container">
        {/* Building image */}
        <div className="building-container">
          <img src={buildingImage} alt="building Image" className="building-image" />
        </div>
    


        {/* Login container */}
        <div className="login-container">
       
        <img src={logoImage} alt="Griddle Logo" className="logo-image" />
     
          <div className="login-box">
            <h2>Landlord Login</h2>
            <div>
              <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <button onClick={handleLogin}>Login</button>
            {/* Registration link */}
            <p>
              Don't have an account? <Link to="/landlordregistration">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
