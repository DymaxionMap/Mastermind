/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';
import Discussion from './Discussion';
import CreateThread from './CreateThread';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5em;
`;

const renderSidebar = (isSelecting, createThread, currentThread, getArticle, getThread, clearCurrentThread, clearSelection) => {
  let component;
  if (isSelecting) {
    component = <CreateThread createThread={createThread} />;
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
      <Container>
        {renderSidebar(isSelecting, createThread, currentThread, getArticle, getThread, clearCurrentThread, clearSelection)}
      </Container>
    );
  }
}

export default Sidebar;
