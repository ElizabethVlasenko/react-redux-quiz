import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {

    state = {
        quiz: [
            {
                answers: [
                    {text: 'answer 1'},
                    {text: 'answer 2'},
                    {text: 'answer 3'},
                    {text: 'answer 4'},
                
                ]
            }

        ]
    }

    render () {
        return (
            <div className={classes.Quiz}>
                <h1>Answer all questions</h1>
                <div className={classes.QuizWrapper}>
                    <ActiveQuiz
                        answers={this.state.quiz[0].answers}
                    />
                </div>
            </div>

        )
    }
}

export default Quiz;