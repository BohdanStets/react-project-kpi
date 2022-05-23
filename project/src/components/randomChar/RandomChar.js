import './RandomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import noImage from '../../resources/img/no-image.jpg';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
const RandomChar = (props) => {
  const [char, setChar] = useState({});

  const { loading, error, getCharacter } = useMarvelService();
  const onCharLoaded = (char) => {
    setChar(char);
  };
  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
    getCharacter(id).then((res) => onCharLoaded(res));
  };
  useEffect(() => {
    updateChar();
  }, []);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  return (
    <div className='randomchar'>
      {errorMessage}
      {spinner}
      {!(loading || error) ? <View char={char} /> : null}
      <div className='randomchar__static'>
        <p className='randomchar__title'>
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className='randomchar__title'>Or choose another one</p>
        <button onClick={() => updateChar()} className='button'>
          try it
        </button>
        <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  return (
    <div className='randomchar__block'>
      <img
        src={
          char.thumbnail !==
          'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ? char.thumbnail
            : noImage
        }
        alt='Random character'
        className='randomchar__img'
      />
      <div className='randomchar__info'>
        <div className='randomchar__name'>{char.name}</div>
        <p className='randomchar__descr'>
          {char.description
            ? char.description
            : 'There is no description about this character...'}
        </p>
        <div className='randomchar__btns'>
          <a href={char.homepage} className='button'>
            homepage
          </a>
          <a href={char.wiki} className='button'>
            Wiki
          </a>
        </div>
      </div>
    </div>
  );
};
export default RandomChar;
