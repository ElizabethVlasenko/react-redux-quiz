import React from "react";
import classes from "./FinishedQuiz.module.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }

    return total;
  }, 0); //transform object to key array

  return (
    <div className={classes.FinishedQuiz}>
      {/* list with right and wrong answers */}
      <ul>
        {props.quiz.map((quizItem, index) => {
          let ico;
          const cls = classes[props.results[quizItem.id]];

          if (props.results[quizItem.id] === "error") {
            ico = faTimes;
          } else {
            ico = faCheck;
          }

          return (
            <li key={index}>
              <strong>{index + 1}.</strong>&nbsp;
              {quizItem.question}
              <FontAwesomeIcon icon={ico} className={cls} />
            </li>
          );
        })}
      </ul>
      <p>
        Your score {successCount}/{props.quiz.length}
      </p>
      <div>
        <Button type={"primary"} disabled={false} onClick={props.onRetry}>
          Try again
        </Button>
        <Link to="/">
          <Button type={"success"}>Go to test list</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
