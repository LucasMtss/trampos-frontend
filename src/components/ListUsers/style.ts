import styled from "styled-components";

export const Title = styled.h1`
    font-size: 32px;
`

export const ContainerUsers = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 24px;
`

export const CardUser = styled.div`
    display: flex;
    padding: 8px;
    flex-direction: column;
    width: 400px;
    background-color: #ddd;
    border-radius: 6px;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.12);
    transition: all 0.2s;
    cursor: pointer;
`

export const ContainerImageName = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`

export const Image = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border: solid 1px #999;
`

export const Name = styled.span`
    font-size: 22 px;
    font-weight: bold;
`

export const Occupation = styled.p`
    font-size: 16px;
    width: 100%;
    text-align: left;
    margin-top: 8px;
`

export const ContainerSkills = styled.div`
    display: flex;
    width: 100%;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
`