import axios from 'axios';

// Set the base URL for all Axios requests
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL; 
axios.defaults.withCredentials = true;
// Replace with your desired base URL

export default axios;