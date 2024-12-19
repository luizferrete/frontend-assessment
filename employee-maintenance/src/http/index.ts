import HttpClient, {Config} from "./HttpClient";

const config: Config = {
    baseURL: 'http://localhost:5219/api/v1.0'
}

const http = new HttpClient(config);

export default http;