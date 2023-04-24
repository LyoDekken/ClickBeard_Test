import styled from "styled-components";
import {shade} from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    place-content: center;
`;


export const Content = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    max-width: 700px;
    align-items: center;

    form {
        padding: 16px;
        width: 340px;
        text-align: center;
        margin-bottom: 72px;
      
        a {
            display: block;
            margin-top: 24px;
            text-decoration: none;
            color: #232129;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
            svg {
                margin-right: 16px;
            }

            &:hover {
                color: ${shade(0.2, '#232129')}
            }
            
        }
    }
`;