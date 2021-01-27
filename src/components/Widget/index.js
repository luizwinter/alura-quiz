
import styled from 'styled-components';
import db from '../../../db.json'

const Widget = styled.div`
color:white;
margin-top: 24px;
margin-bottom: 24px;
border: 1px solid ${({ theme }) => theme.colors.primary};
background-color: ${({ theme }) => {
        return theme.colors.mainBg;
    }};
border-radius: 25px;
overflow: hidden;


h1, h2, h3 {
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0;
  font-family: sans-serif;
}
p {
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  text-align: center;
}
`;

Widget.Header = styled.header`
display: flex;
justify-content: flex-start;
align-items: center;
padding: 10px 40px;
background-color: ${({ theme }) => theme.colors.primary};

* {
  margin: 0;
}
`;



Widget.Content = styled.div`
padding: 24px 32px 32px 32px;
& > *:first-child {
  margin-top: 0;
}
& > *:last-child {
  margin-bottom: 0;
}
ul {
  list-style: none;
  padding: 0;
}

form {
    display: flex;
    flex-direction: column;
  }
  form input {
    padding: 12px;
    border: 1px solid rgba(255,255,255, .1);
    border-radius: .2rem;
    margin-bottom: 2rem;
    color: white;
    background: transparent;
    &::placeholder{
      color: rgba(255,255,255, .4);
    
    }
  }
  button {
    font-weight: 70;
    color: #FFF;
    padding: 10px;
    background: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 10px;
    transition: all .2s;
    cursor: pointer;
    &:hover {
      background:  ${({ theme }) => theme.colors.secondary};
    }
  } 



`;






export default Widget;

