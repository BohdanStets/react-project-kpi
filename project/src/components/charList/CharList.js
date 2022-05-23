import './CharList.scss';
import { useState, useEffect, useRef } from 'react';
import noImage from '../../resources/img/no-image.jpg';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(410);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();
  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemsLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  let itemsRef = useRef([]);
  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? onCharListUpdate(false) : onCharListUpdate(true);
    getAllCharacters(offset).then((res) => onCharListLoaded(res));
  };
  const onCharListUpdate = () => {
    setNewItemsLoading(true);
  };
  const focusOnItem = (id) => {
    itemsRef.current.forEach((item) =>
      item.classList.remove('char__item_selected')
    );
    itemsRef.current[id].classList.add('char__item_selected');
    itemsRef.current[id].focus();
  };

  const renderItems = (arr) => {
    return (
      <ul className='char__flex'>
        {arr.map((item, index) => {
          return (
            <li
              ref={(item) => (itemsRef.current[index] = item)}
              className='char__item'
              key={item.id}
              onClick={() => {
                props.onCharLoaded(item);
                focusOnItem(index);
              }}
            >
              <img
                src={
                  item.thumbnail !==
                  'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                    ? item.thumbnail
                    : noImage
                }
                alt={item.name}
              />
              <div className='char__name'>{item.name}</div>
            </li>
          );
        })}
      </ul>
    );
  };
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  return (
    <div className='char__list'>
      {errorMessage}
      {spinner}
      {renderItems(charList)}
      <button
        disabled={newItemsLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
        className='button button__main'
      >
        load more
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharLoaded: PropTypes.func,
};
export default CharList;
