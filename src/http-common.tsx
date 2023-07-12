
import axios from "axios";
export default axios.create({
    baseURL: "http://127.0.0.1/Github-Repository/earthquake-monitor-be/rest/",
    headers: {
        "Content-type": "application/json",
    }
});

