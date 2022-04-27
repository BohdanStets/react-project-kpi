import AppHeader from "../appHeader/AppHeader";
import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import RandomChar from "../randomChar/RandomChar";
const App = () => {
  return (
    <div className="app">
      <div className="app-wrapper">
        <div className="container">
          <AppHeader />
        </div>
      </div>
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList/>
          <CharInfo/>
        </div>
      </main>
    </div>
  );
};

export default App;
