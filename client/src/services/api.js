import axios from 'axios';
import { BASE_URL } from '../config';

const API_URL = `${BASE_URL}/api`;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
