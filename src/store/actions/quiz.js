import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZZES_ERROR,
} from "./actionTypes";

export function fetchQuizzes() {
  return async (dispatch) => {
    dispatch(fetchQuizzesStart());
    try {
      const response = await axios.get("/quizzes.json");
      const quizzes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({ id: key, name: `Quiz N${index + 1}` });
      });
      dispatch(fetchQuizzesSuccess(quizzes));
    } catch (e) {
      dispatch(fetchQuizzesError(e));
      console.log(e);
    }
  };
}
export function fetchQuizzesStart() {
  return { type: FETCH_QUIZZES_START };
}

export function fetchQuizzesSuccess(quizzes) {
  return { type: FETCH_QUIZZES_SUCCESS, quizzes };
}

export function fetchQuizzesError(e) {
  return { type: FETCH_QUIZZES_ERROR, error: e };
}
