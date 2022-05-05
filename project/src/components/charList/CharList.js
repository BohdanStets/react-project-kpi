import './CharList.scss';
import { Component } from 'react';
import noImage from '../../resources/img/no-image.jpg';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
class CharList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    charList: [],
    loading: true,
    error: false,
  };
  marvelService = new MarvelService();
  onCharListLoaded = (charList) => {
    this.setState({ charList, loading: false });
  };
  onCharListLoading = () => {
    this.setState({ loading: true });
  };
  updateCharList = () => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters()
      .then((res) => this.onCharListLoaded(res))
      .catch(this.onError);
  };
  componentDidMount() {
    this.updateCharList();
  }

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
    const { charList, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    return (
      <div className='char__list'>
        {errorMessage}
        {spinner}
        {!(loading || error) ? this.renderItems(charList) : null}
        <button className='button button__main'>load more</button>
      </div>
    );
  }
}

export default CharList;
