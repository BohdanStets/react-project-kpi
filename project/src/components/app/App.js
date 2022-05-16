import { Component } from 'react';
import AppHeader from '../appHeader/AppHeader';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
class App extends Component {
  state = {
    char: {},
  };
  onCharLoaded = (char) => {
    this.setState({ char });
  };
  onCharDelete = () => {
    this.setState({ char: {} });
  };
  render() {
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
              <CharList onCharLoaded={this.onCharLoaded} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo
                char={this.state.char}
                onCharDelete={this.onCharDelete}
              />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
