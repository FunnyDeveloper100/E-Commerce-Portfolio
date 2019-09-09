import axios from 'axios';
import EventEmitter from '../utils/EventEmitter';
import systemConfig from '../config/system';

class categoryService extends EventEmitter {

    constructor() {
        super();
        this.setDefaults();
    }

    setDefaults = () => {
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
    };


    getAllCategories = () => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + '/categories').then(response => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    getCategoryById = ({ category_id }) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/categories/${category_id}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    getCategoryInProduct = ({product_id}) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/categories/inProduct/${product_id}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response);
            });
        });
    };

    getCategoryInDepartment = ({department_id}) => {
        return new Promise((resolve, reject) => {
            axios.get(systemConfig.serverBaseUrl + `/categories/inDepartment/${department_id}`).then(response => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response);
            });
        });
    };


};

const instance = new categoryService();

export default instance;