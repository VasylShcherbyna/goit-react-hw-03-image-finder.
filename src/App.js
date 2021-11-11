import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Componnent/Searchbar/Searchbar';
import ImageGalleryItem from './Componnent/ImageGalleryItem/ImageGalleryItem';


export default class App extends Component {
  state = {
    image: '',
  };
  handleFormSubmit = image => {
    this.setState({ image });
  }
 

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGalleryItem image={ this.state.image}/>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    );
  }
}


