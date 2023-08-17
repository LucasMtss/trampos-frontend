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

export const Report = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.25);
    padding: 1rem;
    max-height: 600px;
    overflow-y: scroll;

    h2 {
        font-size: 22px;
        margin-top: 1rem;
    }
`

export const Subtitle = styled.h2`
    font-size: 28px;
    margin: 32px 0;

`

export const OccupationText = styled.span`
    font-weight: 500;
    font-size: 18px;
`