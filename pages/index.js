
import styled from 'styled-components';
import { useRouter } from 'next/router' ;
import React from 'react';


import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/Quizlogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';


export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p> 

             <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              }}
              >

             <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName (infosDoEvento.target.value)}
                placeholder="Nome do condenado"
                value ={name}
                />
                <p>Eu, {name}, aceito o desafio </p>
               <Button type="submit" disabled={name.length === 0}>
                Enviar †
               </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
        <Widget.Header>
            <h1>Quizes não tão assustadores</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Explore mais quizes da comunidade. Desta vez não tão assutadores...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/luizwinter" />
    </QuizBackground>
  );
}  
