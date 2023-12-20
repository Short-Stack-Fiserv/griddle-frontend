import { useEffect, useState } from "react"
import TenantService from "../../service/TenantService";
import { useNavigate, useLocation } from "react-router-dom";
import BuildingService from "../../service/BuildingService";
import '../../App.css';
import logoImage from '../../img/griddle-white.png';

export default function ViewAllLandlordInfo() {
    let location = useLocation();
    const landlord = location.state.landlord;

    

    let[buildings, setBuildings] = useState({
        buildings:[]
    });
    useEffect (()=>{
        BuildingService.getAllBuildings().then((response)=>{
            setBuildings(()=>({
                buildings: response.data
            }));
        }, ()=>{});
    }, []);

    let navigate = useNavigate();
    let viewBuilding = (building) => {
        navigate("/landlord/viewBuilding", {state : {landlord: landlord, building: building}})
    }
    let addBuilding = (e) => {
        e.preventDefault();
        navigate("/landlord/addBuilding", {state: {landlord}});
    }
    let addTenant = (e) => {
        e.preventDefault();
        navigate("/landlord/addTenant", {state : {landlord}});
    }
    let goToBalanceOverview = (e) => {
        e.preventDefault();
        navigate("/landlord/balanceOverview", {state : {landlord}});
    }

  
    return(
        <>
        <nav className="navbar">
        <div className="navbar-brand">
            <img src={logoImage} alt="Griddle Logo" className="logo-image-navbar" />
        </div>
        <ul className="nav-list">
            <li><a href="/landlord">Home Page </a></li>
            <li onClick={goToBalanceOverview}>Balance Overview</li>
            <li><a href="/" >Logout</a></li>
        </ul>
        </nav>

        <h2>Welcome {landlord.firstName}!</h2>
        <h2>All Buildings</h2>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Landlord ID</th>
                    <th>Building Name</th>
                    <th>Street Name</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    buildings.buildings.map((building) => {
                        return(
                            <tr>
                                <td>{building.id}</td>
                                <td>{building.landlordid}</td>
                                <td>{building.buildingname}</td>
                                <td>{building.streetname}</td>
                                <td>{building.city}</td>
                                <td>{building.state}</td>
                                <td>{building.zip}</td>
                                <td>
                                    <button onClick={()=>{viewBuilding(building)}}>View Tenants</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <button onClick={addBuilding}>Add Building</button>
        </>
    )
}