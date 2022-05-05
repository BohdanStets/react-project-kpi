import { Component } from 'react';
import AppHeader from '../appHeader/AppHeader';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';
class App extends Component {
  state = {
    char: {},
  };
  onCharLoaded = (char) => {
    this.setState({ char });
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
          <RandomChar />
          <div className='char__content'>
            <CharList onCharLoaded={this.onCharLoaded} />
            <CharInfo char={this.state.char} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
