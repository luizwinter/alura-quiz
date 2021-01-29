import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/Quizlogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import AlternativesForm from '../src/components/AlternativesForm'


function ResultWidget({ results }) {
    return(
        <Widget>
            <Widget.Header>
                <h2>RESULTADO</h2>
            </Widget.Header>
            <Widget.Content>
                <img
                style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                }}
                src={db.imgresult}/>

        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
            <p>{db.resultdes}</p>
        </ul>
            </Widget.Content>
        </Widget>
    );

}





function LoadingWidget() {
    return(
        <Widget>
            <Widget.Header>
            <h2>{db.loading}</h2>
            </Widget.Header>
            <Widget.Content>
            <img
            style={{
           width: '100%',
           height: '150px',
           objectFit: 'cover',
        }}
        src={db.loadingbg}/>
        <p>Agora não tem mais volta...</p>
            </Widget.Content>
        </Widget>
    );

}



function QuestionWidget( {question, totalQuestions, questionIndex, onSubmit, addResult,} ){
    const[selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmite] = React.useState (false);
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

 
    
    return(
        <Widget>
        <Widget.Header>
           <h3> {`Pergunta ${questionIndex + 1} de  ${totalQuestions}`}</h3>
        </Widget.Header>
        <img
        style={{
           width: '100%',
           height: '150px',
           objectFit: 'cover',
        }}
        src={question.image}/>
       <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm 
         onSubmit={(infosDoEvento) =>{
            infosDoEvento.preventDefault();
            setIsQuestionSubmite(true);
            setTimeout(() =>{
                addResult(isCorrect);
                onSubmit();
                setIsQuestionSubmite(false);
                setSelectedAlternative(undefined);
                }, 3 * 500);
                }}>
                 {question.alternatives.map((alternative, alternativeIndex) =>{
                    const alternativeId = `alternative__${alternativeIndex}`;
                    const alternativeStatus = isCorrect ? 'SUCESS' :'ERROR';
                    const isSelected = selectedAlternative === alternativeIndex;
                    return(
                        <Widget.Topic 
                            as="label"
                            key={alternativeId}
                            htmlFor={alternativeId}
                            data-selected={isSelected}
                            data-status={isQuestionSubmited && alternativeStatus}
                                     >
                            <input name={questionId} type="radio" id ={alternativeId}
                            onChange={() => setSelectedAlternative(alternativeIndex)}
                            />
                            {alternative}
                        </Widget.Topic>
                    );
            })}
                <Button type="submit" disabled={!hasAlternativeSelected}>Enviar †</Button>
                {isQuestionSubmited && isCorrect && <p>Correto...</p>}
                {isQuestionSubmited && !isCorrect && <p>Talvez você não esteja acreditando...</p>}
         </AlternativesForm>
                <Widget.Topic></Widget.Topic>

       </Widget.Content>
        </Widget>


    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    function addResult( result ) {
        setResults([
          ...results,
          result,
        ]);
      }

    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1 * 1050);
     }, []);
 

     function handleSubmitQuiz() {
         const nextQuestion = questionIndex + 1;
         if (nextQuestion < totalQuestions) {
             setCurrentQuestion(questionIndex + 1);
         } else {
            setScreenState(screenStates.RESULT);
         }
     }

     return(
        <QuizBackground backgroundImage={db.bg}>
         <QuizContainer>
             <QuizLogo/>
            {screenState === screenStates.QUIZ && (
            <QuestionWidget 
            question={question} 
            totalQuestions={totalQuestions}
            questionIndex={questionIndex} 
            onSubmit={handleSubmitQuiz}  
            addResult={addResult}
            />)}
            {screenState == screenStates.LOADING && <LoadingWidget />}
            {screenState == screenStates.RESULT && <ResultWidget results={results} />}
         </QuizContainer>
        </QuizBackground>

    );

}