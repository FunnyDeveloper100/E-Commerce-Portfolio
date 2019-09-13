import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {setAuthToken} from '../utils/API';
import EventEmitter from '../utils/EventEmitter';
import systemConfig from '../config/system';

class customerService extends EventEmitter {

    constructor() {
        super();

        this.setDefaults();
    }

    setDefaults = () => {
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
    };


    getCustomerByToken = (request) => {
        setAuthToken(request);
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + '/customer').then(response => {
                resolve(response.data);
            }).catch((error) => {
                reject(error.response);
            });
        });
    }

    registerCustomerService = (request) => {
        return new Promise((resolve, reject) => {
            axios.post(systemConfig.serverBaseUrl + '/customers', request).then(response => {
                const { accessToken, customer } = response.data;
                localStorage.setItem('token', accessToken);
                setAuthToken(accessToken);
                resolve(customer);
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    loginCustomerService = (request) => {
        return new Promise((resolve, reject) => {
            axios.post(systemConfig.serverBaseUrl + '/customers/login', request).then(response => {
                const { accessToken, customer } = response.data;
                localStorage.setItem('token', accessToken);
                setAuthToken(accessToken);
                resolve(customer);
            }).catch((error) => {
                reject(error.response);
            })
        })
    }

    logoutCustomerService = () => {
        localStorage.removeItem('token');
    }
}

const instance = new customerService();

export default instance;