import React from "react";
import classes from './AnswerItem.module.css';

const AnswerItem = props => {
    const cls = [classes.AnswerItem];

    if (props.state) {
        cls.push(classes[props.state])
    }

    return (
        <li 
            className={cls.join(' ')} // classes.AnswerItem or classes.AnswerItem success classes.AnswerItem error
           onClick = {cls.length < 2 ? () => props.onAnswerClick(props.answer.id) : null }
        >
            {props.answer.id}. {props.answer.text}
        </li>
    )
};

export default AnswerItem;