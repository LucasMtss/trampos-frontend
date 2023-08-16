import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;

    .form {
        width: 100%;
    }
    
    .form-field {
        text-align: left;
    }

    
`

export const Divider = styled.hr`
    height: 1px;
    background-color: #333;
    width: 100%;
    margin: 16px auto;
`

export const Subtitle = styled.h2`
    font-size: 26px;
    width: 100%;
    text-align: left;
    margin-bottom: 16px;
`