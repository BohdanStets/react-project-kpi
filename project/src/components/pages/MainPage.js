import { React, useState } from 'react';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const MainPage = () => {
  const [char, setChar] = useState({});
  const onCharLoaded = (char) => {
    setChar(char);
  };
  const onCharDelete = () => {
    setChar({});
  };
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className='char__content'>
        <ErrorBoundary>
          <CharList onCharLoaded={onCharLoaded} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo char={char} onCharDelete={onCharDelete} />
        </ErrorBoundary>
      </div>
    </>
  );
};
export default MainPage;
