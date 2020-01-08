import React from 'react'

const PollResult = (props) => {
  const { question, user } = props;
  const selected = user.answers[question.id];
  const optOneVoteCount = question.optionOne.votes.length;
  const optTwoVoteCount = question.optionTwo.votes.length;
  const optOnePercentage = Math.floor((optOneVoteCount / (optOneVoteCount + optTwoVoteCount)) * 100);
  const optTwoPercentage = 100 - optOnePercentage;


  return (
    <ul className="flat-list poll-results">
      <li className={selected === 'optionOne' ? 'selected' : ''}>
        <span>
          {question.optionOne.text}
        </span>
        <span className="votes">
          {`Votes: ${optOneVoteCount} (${optOnePercentage}%)`}
        </span>
      </li>
      <li className={selected === 'optionTwo' ? 'selected' : ''}>
        <span>
          {question.optionTwo.text}
        </span>
        <span className="votes">
          {`Votes: ${optTwoVoteCount} (${optTwoPercentage}%)`}
        </span>
      </li>
    </ul>
  )
}

export default PollResult;