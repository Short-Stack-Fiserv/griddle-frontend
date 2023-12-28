import { useLocation, useNavigate } from "react-router-dom";
import ViewPaymentHistory from "./ViewPaymentHistory";
import TenantPayment from "./TenantPayment";
/*import './tenant.css';*/
import logoImage from '../../img/griddle-white.png';
import { useEffect, useState } from "react"
import LeaseService from "../../service/LeaseService";
import BillService from "../../service/BillService";
import TenantService from "../../service/TenantService";
import PaymentService from "../../service/PaymentService";

export default function ViewAllTenantInfo() {
    let today = new Date();
    let today_string = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    let getMonth = (num) => {
        switch(num) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
            default:
                return "January";
        }
    }

    let location = useLocation();
    let tenant = location.state.tenant;
    console.log("tenant id "+ tenant.id);

    let[leases, setLeases] = useState({
        leases : {}
    });

    let[bills, setBills] = useState({
        bills:[]
    });

    let[paymentsState, setPayments] = useState({
        payments : []
    });

    let[building, setBuilding] = useState({
        zip : '',
        buildingname : '',
        streetname : '',
        city : '',
        id : '',
        state : '',
        landlordid : ''
    })

    let[apartment, setApartment] = useState({
        buildingid:'',
        apartmentnumber:'',
        apartmentID:''
    })

    useEffect (()=>{
        LeaseService.findLeaseByTenant(tenant.id).then((response)=>{
            setLeases(()=>({
                leases: response.data
            }));
        }, ()=>{});
    }, []); 
    console.log('Single Leases:', leases);

    useEffect (()=>{
        BillService.getAllBills().then((response)=>{
            setBills(()=>({
                bills: response.data
            }));
        }, ()=>{});
    }, []);

    useEffect (()=>{
        TenantService.findBuildingByTenant(tenant.id).then((response)=>{
            setBuilding(()=>({
                zip: response.data[0].zip,
                buildingname: response.data[0].buildingname,
                streetname: response.data[0].streetname,
                city: response.data[0].city,
                id: response.data[0].id,
                state: response.data[0].state,
                landlordid: response.data[0].landlordid
            }));
        }, (response)=>{
            console.log("TEST FIND BUILDING " + JSON.stringify(response.data));
        });
    }, []);

    useEffect (()=>{
        TenantService.findApartmentByTenant(tenant.id).then((response)=>{
            setApartment(()=>({
                buildingid: response.data[0].buildingid,
                apartmentnumber:response.data[0].apartmentnumber,
                apartmentID:response.data[0].apartmentID
            }));
        }, (response)=>{
            console.log("TEST FIND BUILDING " + JSON.stringify(response.data));
        });
    }, []);

    useEffect (()=>{
        PaymentService.findAllPaymentsByTenant(tenant.id).then((response)=>{
            setPayments(()=>({
                payments : response.data
            }));
        }, (response)=>{
            console.log("TEST FIND BUILDING " + JSON.stringify(response.data));
        });
    }, []);
    //console.log("tenant by payment: " + payments)

    let navigate = useNavigate();
    let goToHistory = (e) => {
        e.preventDefault();
        navigate("/tenant/paymentHistory", {state : {tenant}});
    }
    let newPayment = (e) => {
        e.preventDefault();
        navigate("/tenant/newPayment", {state : {tenant}});
    }

    let goToHomePage = (e) => {
        e.preventDefault();
        navigate("/tenant/dashboard", {state : {tenant}});
    }
    
    let total_charges = leases.leases.rent;
    
    console.log(tenant.balance);
    
    return(
        <>
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={logoImage} alt="Griddle Logo" className="logo-image-navbar" />
            </div>
            <ul className="nav-list">
                <li onClick={goToHomePage}>Home Page</li>
                <li><a href="/" >Logout</a></li>
            </ul>
        </nav>

        <div id="payment-tenant" className="welcome-balance-container">
        <div id="top-right-head-tenant">
            <h2>Welcome, {tenant.firstName}!</h2>
            <div id="balance-tenant">
                <h3>CURRENT BALANCE: ${tenant.balance}</h3>
                <p>&nbsp;(as of: {today_string})</p>
            </div>
        </div>
        </div>

        <div id="dashboard-tenant">
            <div id="info-tenant" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div id="left-info-container" style={{ flexGrow: 1, marginRight: '150px' }}>
                    <div id="contact-card-tenant" >
                        <h3>Personal Information</h3>
                        <p>{building.streetname}, Unit# {apartment.apartmentnumber}</p>
                        <p>{building.city}, {building.state} {building.zip}</p>
                        <br />
                        <p>EMAIL: {tenant.email}</p>
                        <p>PHONE: {tenant.phone}</p>
                    </div>
                    <div id="balance-summary-tenant" style={{ marginTop: '70px' }}>
                        <h3>{getMonth(today.getMonth())} Balance Summary</h3>
                        <table>
                        </table>
                        <button onClick={newPayment}>Pay Remaining Balance</button>
                    </div>
                </div>
                <div id="payment-tenant">
                    <div id="table-head-tenant">
                        <h3>Recurring Charges</h3>
                        <button onClick={newPayment}>Pay Now</button>
                    </div>
                    <table className="tenant-custom-table">
                    <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${leases.leases.rent}</td>
                                <td>Rent</td>
                            </tr>
                            {
                                bills.bills
                                .filter((bill) => bill.leaseid === leases.leases.id)
                                .map((filteredBill) => {
                                    total_charges += filteredBill.amount;
                                    return (
                                    <tr key={filteredBill.id}>
                                        <td>${filteredBill.amount}</td>
                                        <td>{filteredBill.description}</td>
                                    </tr>
                                    )
                                })
                            }
                            <tr>
                                <td>${total_charges}</td>
                                <td>TOTAL</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="table-head-tenant" style={{ marginTop: '50px' }}>
                        <h3>Payment History</h3>
                        <button onClick={goToHistory}>View All</button>
                    </div>
                    <table className="tenant-custom-table">
                    <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                paymentsState.payments.map((payment) => {
                                    return (
                                        <tr>
                                            <td>{payment.paymentdate}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.note}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        </>

       
    )
}