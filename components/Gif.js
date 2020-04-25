var GIPHY_LOADING_URL = "assets/tomato.gif";

class Gif extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;
    return (
      <div className="row">
        <div className="col l12 s12">
        <a href={this.props.sourceUrl} title={this.props.sourceUrl} target="new">
          <img id="gif" src={url} />
        </a>
        </div>   
      </div>
    );
  }
}
