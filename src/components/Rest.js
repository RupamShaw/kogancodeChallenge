import React from 'react';

export default class Rest extends React.Component {

  render() {
    const { value } = this.props

    return (
      <div>
        <h1>Kogan code challenge  </h1>
        <div>{value}</div>
        <button onClick={this.props.onClickUser} >Average</button>
      </div>
    )
  }
}
