import React from 'react'

const UserCard = (props) => (
  <div className="user-card poll">
    <img className="poll-user-avatar" src={props.user.avatarURL} alt=""></img>
    <div className="question-info">
      <h3>{props.user.name} is #{props.rank}</h3>
      <p>Answers: {props.user.answers}</p>
      <p>Questions: {props.user.questions}</p>
      <h3>Total: {props.user.answers + props.user.questions}</h3>
    </div>
  </div>
)

export default UserCard;