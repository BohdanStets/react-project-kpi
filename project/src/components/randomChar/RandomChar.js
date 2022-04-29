import './RandomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import noImage from '../../resources/img/no-image.jpg';
class RandomChar extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: null,
    description: null,
    thumbnail: null,
    homepage: null,
    wiki: null,
  };
  marvelService = new MarvelService();
  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
    this.marvelService.getCharacter(id).then((res) =>
      this.setState(res)
    );
  };
  componentDidMount() {
    this.updateChar();
  }
  render() {
    return (
      <div className='randomchar'>
        <div className='randomchar__block'>
          <img
            src={
              this.state.thumbnail !==
              'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                ? this.state.thumbnail
                : noImage
            }
            alt='Random character'
            className='randomchar__img'
          />
          <div className='randomchar__info'>
            <div className='randomchar__name'>{this.state.name}</div>
            <p className='randomchar__descr'>{this.state.description}</p>
            <div className='randomchar__btns'>
              <a href={this.state.homepage} className='button'>
                homepage
              </a>
              <a href={this.state.wiki} className='button'>
                Wiki
              </a>
            </div>
          </div>
        </div>
        <div className='randomchar__static'>
          <p className='randomchar__title'>
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className='randomchar__title'>Or choose another one</p>
          <button onClick={() => this.updateChar()} className='button'>
            try it
          </button>
          <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
        </div>
      </div>
    );
  }
}

export default RandomChar;
