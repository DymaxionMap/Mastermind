/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import Discussion from './Discussion';

const renderSidebar = (isSelecting, createThread, currentThread) => {
  let component;
  if (isSelecting) {
    component = <button id="startThread" type="button" onClick={createThread}>Start new thread</button>;
  } else if (currentThread) {
    component = <Discussion currentThread={currentThread} />;
  } else {
    component = null;
  }
  return component;
};

class Sidebar extends Component {
  render() {
    const { isSelecting, createThread, currentThread } = this.props;
    return (
      <div>
        {renderSidebar(isSelecting, createThread, currentThread)}
      </div>
    );
  }
}

export default Sidebar;
