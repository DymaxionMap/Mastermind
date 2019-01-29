import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
`;

const Nav = () => (
  <StyledNav>
    Mastermind
  </StyledNav>
);

export default Nav;
