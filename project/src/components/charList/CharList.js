import './CharList.scss';
import { Component } from 'react';
import noImage from '../../resources/img/no-image.jpg';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

class CharList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemsLoading: false,
    offset: 410,
  };
  marvelService = new MarvelService();
  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemsLoading: false,
      offset: offset + 9,
      charEnded: false,
      charEnded: ended,
    }));
  };
  onCharListLoading = () => {
    this.setState({ loading: true });
  };

  componentDidMount() {
    this.onRequest();
  }
  onRequest = (offset) => {
    this.onCharListUpdate();
    this.marvelService
      .getAllCharacters(offset)
      .then((res) => this.onCharListLoaded(res))
      .catch(this.onError);
  };
  onCharListUpdate = () => {
    this.setState({ newItemsLoading: true });
  };
  onError = () => {
    this.setState({ error: false, loading: false });
  };
  renderItems = (arr) => {
    return (
      <ul className='char__flex'>
        {arr.map((item) => {
          return (
            <li
              className='char__item'
              key={item.id}
              onClick={() => this.props.onCharLoaded(item)}
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
  render() {
    const { charList, loading, error, newItemsLoading, offset, charEnded } =
      this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    return (
      <div className='char__list'>
        {errorMessage}
        {spinner}
        {!(loading || error) ? this.renderItems(charList) : null}
        <button
          disabled={newItemsLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
          onClick={() => this.onRequest(offset)}
          className='button button__main'
        >
          load more
        </button>
      </div>
    );
  }
}
CharList.propTypes = {
  onCharLoaded: PropTypes.func,
};
export default CharList;
