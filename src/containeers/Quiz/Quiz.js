import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {

    state = {
        quiz: [
            {   
                question:'Question 1',
                answers: [
                    {text: 'answer 1', id: 1},
                    {text: 'answer 2', id: 2},
                    {text: 'answer 3', id: 3},
                    {text: 'answer 4', id: 4},
                ],
                rightAnswerId: 2
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log(answerId);

    }

    render () {
        return (
            <div className={classes.Quiz}>
                <h1>Answer all questions</h1>
                <div className={classes.QuizWrapper}>
                    <ActiveQuiz
                        question={this.state.quiz[0].question}
                        answers={this.state.quiz[0].answers}
                        onAnswerClick={this.onAnswerClickHandler}
                    />
                </div>
            </div>

        )
    }
}

export default Quiz;