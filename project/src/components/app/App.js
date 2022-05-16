import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
const App = () => {
  const [char,setChar] = useState({})
  const onCharLoaded = (char) => {
    setChar(char);
  };
  const onCharDelete = () => {
    setChar({});
  };
  return (
    <div className='app'>
      <div className='app-wrapper'>
        <div className='container'>
          <AppHeader />
        </div>
      </div>
      <main>
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
      </main>
    </div>
  );
};

export default App;
