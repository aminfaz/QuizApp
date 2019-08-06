import axios from 'axios';
import apiConfig from './config';

const instance = axios.create({
    baseURL: apiConfig.baseURI
});

class QuizAPI {

    static getQuestions(successHandler) {
        instance.get('/questions')
            .then(function (response) {
                successHandler(response.data.body);
            });
    }

};

export default QuizAPI;