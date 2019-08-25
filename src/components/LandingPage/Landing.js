import styled from "styled-components";

export const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};
export const Wrapper = styled.div`
  background-color: #f8f9fe;
  height: 100vh;
  width: 100vw;
  position: absolute;
`;

export const Container = styled.div`
  display: flex;
  border: 3px solid #8aa5ad;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: #282c34; */
  /* border: 1px solid red; */
  width: 25%;
  /* height: 45vh; */
  position: relative;
  top: 30%;
  left: 37%;
`;
export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #122c34;
`;

export const Annotation = styled.span`
  font-size: 1rem;
  text-align: center;
  color: #122c34;
`;

export const Button = styled.button`
  /* display: inline-block; */
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #122c34;
  border-radius: 3px;
  cursor: pointer;
  background: ${props => (props.primary ? "'#8AA5AD'" : "#F8F9FE")};
  color: ${props => (props.primary ? "black" : "black")};
  /* display: block; */
  font-size: ${props => (props.sized ? "0.8em" : "1.3em")};
`;

export const Form = styled.input`
  width: 50%;
  border-radius: 5%;
  padding: 5px;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 0 10px 0;
`;

export const SignUp = styled.div`
  display: flex;
  /* border: 1px solid green; */
  justify-content: center;
  align-items: center;
`;
