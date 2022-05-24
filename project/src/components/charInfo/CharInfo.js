import './CharInfo.scss';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skelet from '../skelet/Skelet';
import noImage from '../../resources/img/no-image.jpg';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const CharInfo = (props) => {
  const [loading, setLoading] = useState(false);

  const onComicsloaded = (comics) => {
    const items = [];
    for (let item in comics) {

      let link = `/comics/${comics[item].resourceURI.replace(
        'http://gateway.marvel.com/v1/public/comics/',
        ''
      )}`;
      console.log(link)
      items.push(
        <li className='char__comics-item' key={comics[item].name}>
          <Link to={link}>{comics[item].name}</Link>
        </li>
      );
    }
    return items;
  };
  useEffect(() => {
    setLoading(true);
  }, []);

  const { name, description, thumbnail, wiki, homepage, comics } = props.char;
  console.log(comics);
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
