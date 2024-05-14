import axios from "axios";
import AuthService from "./AuthServices";

function createHeader() {
  const jwt = AuthService.PegarToken();
  if (jwt) {
    return {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    };
  }
}
const baseUrl = "https://localhost:7121/api";
const ApiService = {
  async get(endpoint) {
    const header = createHeader();
    const response = await axios.get(baseUrl + endpoint, header);
    return response;
  },
                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  async post(endpoint, body) {
    const header = createHeader();
    const response = await axios.post(baseUrl + endpoint, body, header);
    return response;
  },
};

export default ApiService;
