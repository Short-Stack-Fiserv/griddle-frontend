import React, { useState, useEffect } from 'react';

import TenantService from '../../service/TenantService';
import { Link, useNavigate } from 'react-router-dom';
import buildingImage from '../../img/building.jpg';
import logoImage from '../../img/logo.png';
import '../../App.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let[state, setState] = useState({
    tenants: []
  });
  useEffect (() => {
      TenantService.getAllTenants().then((response)=>{
          setState(()=>({
              tenants: response.data
          }));
      }, ()=>{});
  }, []);

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    let found = false;
    for(let i = 0; i < state.tenants.length; i++) {
      const tenant = state.tenants[i];
      if(tenant.username == username) {
        if(tenant.password == password) {
          found = true;
          navigate("/tenant/dashboard", {state: {tenant}});
        } else {
          found = true;
          alert("Password incorrect");
          break;
        }
      } 
    }
    if(!found) {
      alert("Invalid username");
    }
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
            <h2>Tenant Login</h2>
            <div>
              <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </label>
            </div>
            <button onClick={handleLogin}>Login</button>
            {/* Registration link  */}
            {/* <p>
              Don't have an account? <Link to="/registration">Register</Link>
            </p>  */}
          </div>
        </div>
      </div>
    </div>
  )
}
