import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  state = {
    picture: null,
    loading: false,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.image !== this.props.image) {
      this.setState({ loading: true, picture: null });
      fetch(
        'https://pixabay.com/api/?q={this.props.image}&page=1&key=22516391-185885990a61958acb3a57b33&image_type=photo&orientation=horizontal&per_page=12',
      )
        .then(res => res.json())
        .then(picture => this.setState({ picture }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <>
        <li className="ImageGalleryItem">
          <img src="" alt="" className="ImageGalleryItem-image" />
        </li>
        {this.state.error && <h1>Такого имени нет</h1>}
        {this.state.loading && <div>Загружаем...</div>}
        {this.state.picture && <div>{this.state.picture.name}</div>}
        <p>{this.props.image}</p>
      </>
    );
  }
}
