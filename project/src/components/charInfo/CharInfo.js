import './CharInfo.scss';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skelet from '../skelet/Skelet';
class CharInfo extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loading: false,
    error: false,
  };
  onCharInfoLoaded = () => this.setState({ loading: true });
  onComicsloaded = (comics) => {
    const items = [];
    for (let item in comics) {
      items.push(
        <li className='char__comics-item'>
          <a href={comics[item].resourceURL}>{comics[item].name}</a>
        </li>
      );
    }
    return items;
  };
  componentDidMount(){
    this.setState({loading:true});
  }
  render() {
    const { name, description, thumbnail, wiki, homepage, comics } =
      this.props.char;
    const errorMessage = this.state.error ? <ErrorMessage /> : null;
    const skelet = this.state.loading ? <Spinner/> : null;
    return (
      <>
        {!name ? skelet : (
          <div className='char__info'>
            <div className='char__basics'>
              <img src={thumbnail} alt={thumbnail} />
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
            </div>
            <div className='char__descr'>{description}</div>
            <div className='char__comics'>Comics:</div>
            <ul className='char__comics-list'>{this.onComicsloaded(comics)}</ul>
          </div>
        )}
      </>
    );
  }
}

export default CharInfo;
