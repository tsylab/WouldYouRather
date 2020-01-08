import React, { Component } from 'react'

/**
 * Input wrapper with optional title and optional total text length limit
 */
class RestrictedInput extends Component {
  state = {
    text: ''
  }
  onTextChange = (e) => {
    const { limit, inputKey, onChange } = this.props;
    const text = limit ? e.target.value.substring(0, limit) : e.target.value
    this.setState({
      text
    })
    if (onChange) {
      onChange(text, inputKey);
    }
  }
  render() {
    const { title, limit } = this.props;
    return (
      <div className="text-input">
        { title && (
          <p className="title">{title}</p>
        )}
        { limit && (
          <p className="limit">{`${this.state.text.length}/${limit}`}</p>
        )}
        <input type="text" value={this.state.text} onChange={this.onTextChange} />
      </div>
    )
  }
}

export default RestrictedInput;