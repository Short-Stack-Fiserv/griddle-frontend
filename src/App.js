// App.js
import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './components/homepages/LandingPage';
import LandlordLoginPage from './components/homepages/LandlordLoginPage';
import LandlordRegistrationPage from './components/homepages/LandlordRegistrationPage';
import ViewAllTenantInfo from './components/tenant/ViewAllTenantInfo';
import ViewAllLandlordInfo from './components/landlord/ViewAllLandlordInfo';
import LoginPage from './components/homepages/LoginPage';
import RegistrationPage from './components/homepages/RegistrationPage';
import ViewPaymentHistory from './components/tenant/ViewPaymentHistory';
import TenantPayment from './components/tenant/TenantPayment';
import AddCard from './components/tenant/AddCard';
import logoImage from './img/logo.png';
import AddTenant from './components/landlord/AddTenant';
import AddBuilding from './components/landlord/AddBuilding';
import ViewTenantsForBuilding from './components/landlord/building/ViewTenantsForBuilding';
import AddApartment from './components/landlord/building/AddApartment';
import AddLease from './components/landlord/building/AddLease';
import BalanceOverview from './components/landlord/BalanceOverview';
import ViewTenant from './components/landlord/ViewTenant';

const Header = () =>{
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const shouldRenderHeader = !["/","/login", "/registration", "/landlordlogin", "/landlordregistration", "/landlord", "/landlord/addBuilding", "/landlord/viewBuilding", "/landlord/addLease", "/tenant/dashboard", "/landlord/balanceOverview" ].includes(currentPath);

  return shouldRenderHeader ? (
    <header>
      <img src={logoImage} alt="Griddle Logo" className="logo-image" /> 
    </header>
  ):null;
};

function App() {
  return (
    <div className="App">
      {/* <img src="./img/logo.png" alt="griddle"/> */}
      <BrowserRouter>

      <Header />
      <Routes>
          <Route path={"/"} element={<LandingPage/>} exact={true}/>
          <Route path={"/login"} element={<LoginPage/>} exact={true}/>
          <Route path={"/registration"} element={<RegistrationPage/>}/>
          <Route path={"/landlordlogin"} element={<LandlordLoginPage/>} exact={true}/>
          <Route path={"/landlordregistration"} element={<LandlordRegistrationPage/>}/>
          <Route path={"/landlord"} element={<ViewAllLandlordInfo />} exact={true}/>
          <Route path={"/landlord/balanceOverview"} element={<BalanceOverview />} exact={true}/>
          <Route path={"/landlord/addTenant"} element={<AddTenant/>} exact={true}/>
          <Route path={"/landlord/addBuilding"} element={<AddBuilding/>} exact={true}/>
          <Route path={"/landlord/addApartment"} element={<AddApartment/>} exact={true}/>
          <Route path={"/landlord/addLease"} element={<AddLease/>} exact={true}/>
          <Route path={"/landlord/viewBuilding"} element={<ViewTenantsForBuilding/>} exact={true}/>
          <Route path={"/landlord/viewTenant"} element={<ViewTenant/>} exact={true}/>
          <Route path={"/tenant/dashboard"} element={<ViewAllTenantInfo />} exact={true}/>
          <Route path={"/tenant/paymentHistory"} element={<ViewPaymentHistory/>} exact={true}></Route>
          <Route path={"/tenant/newPayment"} element={<AddCard/>} exact={true}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

