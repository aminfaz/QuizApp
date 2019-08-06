import axios from 'axios';
import apiConfig from './config';
/*
const axios = require('axios');
const apiConfig = require('./config');
*/
const instance = axios.create({
    baseURL: apiConfig.baseURI
});

class QuizAPI {

    static getQuestions(successHandler) {
        instance.get('/questions')
            .then(function (response) {
                successHandler(response.data);
            });
    }

};

export default QuizAPI;