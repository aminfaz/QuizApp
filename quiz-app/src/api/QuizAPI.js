import axios from 'axios';
import apiConfig from './config';

const instance = axios.create({
    baseURL: apiConfig.baseURI
});

class QuizAPI {

    static async getQuestions(successHandler) {
        let response = await instance.get('/questions');
        return response.data.body;
    }

};

export default QuizAPI;