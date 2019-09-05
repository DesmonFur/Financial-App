import styled from "styled-components";
export const BudgetInfo = styled.div`
display: flex;
border-bottom: 1px solid grey;
/* border-top: 1px solid grey; */
justify-content: space-between;
position: relative;
/* right: 26.5vw; */
top: 11vh;
width: 86vw;
color: black;
background-color: rgb(229, 245, 249);
align-items: center;
align-content: center;
`;

export const Heading = styled.h5`
color: black;
`;

export const Header = styled.div`
display: flex;
border-bottom: 1px solid grey;
position: relative;
top: 11vh;
width: 86vw;

justify-content: space-between;
align-items: center;
`;

export const Delete = styled.span`
cursor: pointer;
position: absolute;
right: 1vw;
`;

export const BudgetTitle = styled.h4`
cursor: pointer;
font-size: 20px;
/* position: absolute; */
`;

export const Date = styled.h4`
/* border: 1px solid red; */
position: absolute;
left: 30vw;
`;

export const Inflow = styled.h4`
position: absolute;
right: 22vw;
`;
