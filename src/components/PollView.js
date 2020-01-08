import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

/**
 * Displays list of poll options
 */
const PollView = (props) => (
  <Fragment>
    <ul className="poll-options">
      <li>
        {props.question.optionOne.text}
      </li>
      <li>
        {props.question.optionTwo.text}
      </li>
    </ul>
    <Link className="btn btn-poll btn-bordered" to={`/questions/${props.question.id}`}>View Poll</Link>
  </Fragment>
)

export default PollView;