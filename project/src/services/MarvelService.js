class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'c60732a3c11ef854cc73634a8b9cc36f';
  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };
  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`
    );
    return res.data.results.map((item) => this._transformCharacter(item));
  };
  getCharacter = async (id) => {
    return await this.getResource(
      `${this._apiBase}characters/${id}?apikey=${this._apiKey}`
    ).then((res) => this._transformCharacter(res.data.results[0]));
  };
  _transformCharacter = (res) => {
    return {
      name: res.name,
      description: res.description,
      thumbnail:
        res.thumbnail.path +
        '.' +
        res.thumbnail.extension,
      homepage: res.urls[0].url,
      wiki: res.urls[1].url,
    };
  };
}

export default MarvelService;
