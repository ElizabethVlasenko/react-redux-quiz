import React from "react";
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = props => {
    return (
        <div className = { classes.FinishedQuiz }>
            {/* list with right and wrong answers */}
            <ul>
                <li>
                    <strong>1. </strong>
                    question 1 
                    <i className ={'fa fa-times ' + classes.error}/>
                </li>
                <li>
                    <strong>2. </strong>
                    question 2 
                    <i className ={'fa fa-check ' + classes.success}/>
                </li>
            </ul>

            <p>
                Your score 4/8
            </p>

            <div>
                <button>Try again</button>
            </div>
        </div>
    )
}

export default FinishedQuiz;