
import axios from "axios";
export default axios.create({
    baseURL: "http://192.168.1.64/Github-Repository/earthquake-monitor-be/rest/",
    headers: {
        "Content-type": "application/json",
    }
});

