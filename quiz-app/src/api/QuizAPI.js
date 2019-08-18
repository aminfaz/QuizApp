import axios from "axios";
import apiConfig from "./config";

const instance = axios.create({
  baseURL: apiConfig.baseURI
});

class QuizAPI {
  static async getQuestions(setId) {
    let response = await instance.get("/questions?setId=" + setId);
    return response.data;
  }

  static async getSets() {
    let response = await instance.get("/sets");
    return response.data;
  }
}

export default QuizAPI;
