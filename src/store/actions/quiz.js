import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
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

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizzesStart());
    try {
      const response = await axios.get(`/quizzes/${quizId}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizzesError(e));
      console.log(e);
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return { type: FETCH_QUIZ_SUCCESS, quiz };
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

export function quizSetState(answerState, results) {
  return { type: QUIZ_SET_STATE, answerState, results };
}

export function finishQuiz() {
  return { type: FINISH_QUIZ };
}

export function quizNextQuestion(nextQuestion) {
  return { type: QUIZ_NEXT_QUESTION, nextQuestion };
}

export function retryQuiz() {
  return { type: QUIZ_RETRY };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      const key = Object.keys(state.answerState); //get answerState id

      if (state.answerState[key] === "success") {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    console.log(question.rightAnswerId, answerId);
    if (question.rightAnswerId === answerId) {
      if (state.results[question.id] === "error") {
        dispatch(
          quizSetState({ [answerId]: "success" }, { [question.id]: "error" })
        );
        // this.setState({
        //   answerState: { [answerId]: "success" },
        //   results: { ...this.state.results, [question.id]: "error" },
        // });
      } else {
        dispatch(
          quizSetState({ [answerId]: "success" }, { [question.id]: "success" })
        );
        // this.setState({
        //   answerState: { [answerId]: "success" },
        //   results: { ...this.state.results, [question.id]: "success" },
        // });
      }

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      console.log("err");
      dispatch(
        quizSetState({ [answerId]: "error" }, { [question.id]: "error" })
      );
      // this.setState({
      //   answerState: { [answerId]: "error" },
      //   results: { ...this.state.results, [question.id]: "error" },
      // });
    }
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
