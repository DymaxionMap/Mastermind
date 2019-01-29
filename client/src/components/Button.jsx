import styled from 'styled-components';

const Button = styled.button`
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem;
  border: thin solid gray;
  border-radius: 0.2rem;

  &:hover {
    color: white;
    background-color: black;
  }
`;

export default Button;
