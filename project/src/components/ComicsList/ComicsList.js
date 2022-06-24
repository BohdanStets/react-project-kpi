import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../resources/img/no-image.jpg';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './ComicsList.scss';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setnewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    setnewItemLoading(initial);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = newComicsList.length < 8;
    setComicsList([...comicsList, ...newComicsList]);
    setnewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li className='comics__item' key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={
                item.thumbnail !==
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                  ? item.thumbnail
                  : noImage
              }
              alt={item.title}
              className='comics__item-img'
            />
            <div className='comics__item-name'>{item.title}</div>
            <div className='comics__item-price'>{item.price}</div>
          </Link>
        </li>
      );
    });

    return <ul className='comics__flex'>{items}</ul>;
  }

  const items = renderItems(comicsList);
  console.log(comicsList)

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className='comics__list'>
      {errorMessage}
      {spinner}
      {items}
      <button
        disabled={newItemLoading}
        style={{ display: comicsEnded ? 'none' : 'block' }}
        className='button button__main'
        onClick={() => onRequest(offset)}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
