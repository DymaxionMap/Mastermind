/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import Discussion from './Discussion';

const renderSidebar = (isSelecting, createThread, currentThread, getArticle, getThread, clearCurrentThread, clearSelection) => {
  let component;
  if (isSelecting) {
    component = <button id="startThread" type="button" onClick={createThread}>Start new thread</button>;
  } else if (currentThread) {
    component = <Discussion currentThread={currentThread} getArticle={getArticle} getThread={getThread} clearCurrentThread={clearCurrentThread} clearSelection={clearSelection} />;
  } else {
    component = null;
  }
  return component;
};

class Sidebar extends Component {
  render() {
    const { isSelecting, createThread, currentThread, getArticle, getThread, clearCurrentThread, clearSelection } = this.props;
    return (
      <div>
        {renderSidebar(isSelecting, createThread, currentThread, getArticle, getThread, clearCurrentThread, clearSelection)}
      </div>
    );
  }
}

export default Sidebar;
