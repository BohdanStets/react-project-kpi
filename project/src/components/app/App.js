import AppHeader from "../appHeader/AppHeader";
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
      </main>
    </div>
  );
};

export default App;
