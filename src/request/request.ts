import axios from "axios";

axios.defaults.withCredentials = true
let instance = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 2000
})

export default instance;