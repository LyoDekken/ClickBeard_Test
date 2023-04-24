import styled, { css } from "styled-components";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  margin-top: 12px;
  border: 2px solid #232129;
  color: #86888b;

  ${(props) =>
    props.isErrored &&
    css`
      color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #6abd58;
    `}
            
            ${(props) =>
    props.isFilled &&
    css`
      color: #6abd58;
    `}



        input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #fafafa;
  }
  
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled.div`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }
`;
