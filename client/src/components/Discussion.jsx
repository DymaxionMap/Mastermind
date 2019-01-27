/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';

class Discussion extends Component {
  render() {
    const { isSelecting, createThread } = this.props;
    return (
      <div>
        {(isSelecting) ? <button id="startThread" type="button" onClick={createThread}>Start new thread</button> : null}
      </div>
    );
  }
}

export default Discussion;
