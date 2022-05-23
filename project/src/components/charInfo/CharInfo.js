import './CharInfo.scss';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skelet from '../skelet/Skelet';
import noImage from '../../resources/img/no-image.jpg';
import PropTypes from 'prop-types';
const CharInfo = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onCharInfoLoaded = () => setLoading(true);
  const onComicsloaded = (comics) => {
    const items = [];
    for (let item in comics) {
      items.push(
        <li className='char__comics-item' key={comics[item].name}>
          <a href={comics[item].resourceURL}>{comics[item].name}</a>
        </li>
      );
    }
    return items;
  };
  useEffect(() => {
    setLoading(true);
  }, []);

  const { name, description, thumbnail, wiki, homepage, comics } = props.char;
  const skelet = loading ? <Skelet /> : null;
  return (
    <>
      {!name ? (
        skelet
      ) : (
        <div className='char__info'>
          <div className='char__basics'>
            <img
              src={
                thumbnail !==
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                  ? thumbnail
                  : noImage
              }
              alt={thumbnail}
            />
            <div className='char__info-wrapper'>
              <div className='char__info-name'>{name}</div>
              <div className='char__btns'>
                <a href={homepage} className='button'>
                  homepage
                </a>
                <a href={wiki} className='button'>
                  Wiki
                </a>
              </div>
            </div>
            <button className='btn-delete' onClick={() => props.onCharDelete()}>
              X
            </button>
          </div>
          <div className='char__descr'>{description}</div>
          <div className='char__comics'>Comics:</div>
          <ul className='char__comics-list'>{onComicsloaded(comics)}</ul>
        </div>
      )}
    </>
  );
};

CharInfo.propsTypes = {
  charId: PropTypes.object,
  onCharDelete: PropTypes.func,
};
export default CharInfo;
