import { API } from 'aws-amplify';

class QuizAPI {
  static async getQuestions(setId) {
    let response = await API.get('quizAPI', `/questions?setId=${setId}`);
    return response;
  }

  static async getSets() {
    let response = await API.get('quizAPI', "/sets");
    return response;
  }
}

export default QuizAPI;
