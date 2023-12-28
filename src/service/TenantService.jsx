import React from "react";
import axios from "axios";

const getAllTenantsUrl = "http://localhost:8080/api/tenants";
const getAllTenantsByLandlordUrl = "http://localhost:8080/api/tenants/landlord/";
const findTenantUrl = "http://localhost:8080/api/tenants/";
const findTenantByUsernameUrl = "http://localhost:8080/api/tenant";
const findBuildingByTenantUrl = "http://localhost:8080/api/tenant/building/";
const findApartmentByTenantUrl = "http://localhost:8080/api/tenant/apartment/";
const addTenantUrl = "http://localhost:8080/api/addTenant";
const updateTenantUrl = "http://localhost:8080/api/updateTenant";
const deleteTenantUrl = "http://localhost:8080/api/deleteTenant/";

class TenantService {
    getAllTenants() {
        return axios.get(getAllTenantsUrl);
    }
    
    getAllTenantsByLandlord(id) {
        return axios.get(getAllTenantsByLandlordUrl + id);
    }

    findTenant(id) {
        return axios.get(findTenantUrl + id);
    }

    findBuildingByTenant(id) {
        return axios.get(findBuildingByTenantUrl + id);
    }

    findApartmentByTenant(id) {
        return axios.get(findApartmentByTenantUrl + id);
    }

    findTenantByUsername(username) {
        return axios.get(findTenantByUsernameUrl, {params : {username : username}})
    }

    addTenant(tenant) {
        return axios.post(addTenantUrl, tenant);
    }

    updateTenant(tenant) {
        return axios.put(updateTenantUrl, tenant);
    }

    deleteTenant(id) {
        return axios.delete(deleteTenantUrl + id);
    }
}

export default new TenantService();