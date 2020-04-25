class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchingText: "",
      gif: {},
    };
  }

  handleSearch = (searchingText) => {
    if (true) {
      console.log(searchingText)
      this.setState({
        loading: true,
      });

      this.getGif(searchingText)
        .then((gif) => {
          this.setState({
            loading: false,
            gif: gif,
            searchingText: searchingText,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  getGif = (searchingText) => {
    return new Promise((resolve, reject) => {
      const GIPHY_PUB_KEY = "Tj0Zkn8M11H60GBwCg70bAUZ0IDvheBi";
      const GIPHY_API_URL = "https://api.giphy.com";
      const url = `${GIPHY_API_URL}/v1/gifs/random?api_key=${GIPHY_PUB_KEY}&tag=${searchingText}`;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.send();

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText).data;
          const gif = {
            url: data.images.downsized_large.url,
            sourceUrl: data.url,
          };
          resolve(gif);
        } else {
          reject("error");
        }
      };
    });
  };



  render() {
    return (
      <div className="container z-depth-5">
        <div className="row">
          <div className="col l12">
            <h1 className="teal-text">WYSZUKIWARKA GIFÓW</h1>
            <p>
              Znajdź GIFy na:
              <a href="http://giphy.com"> giphy.com</a>
              <br />
              Wciśnij enter aby załadować więcej!
            </p>
          </div>
        </div>

        <Search handleSearch={this.handleSearch} />
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
}
