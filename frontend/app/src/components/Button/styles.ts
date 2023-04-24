import styled from "styled-components";
import {shade} from 'polished';

export const Container = styled.button`
  
    border-radius: 10px;
    border: 0;
    height: 64px;
    padding: 0 16px;
    width: 100%;
    color: #6abd58;
    background-color: #232129;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, "#232129")};
    }
 
`;
