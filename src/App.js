import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Componnent/Searchbar/Searchbar';


export default class App extends Component {
  state = {
    image: '',
  };
  handleFormSubmit = image => {
    this.setState({ image });
  }
  componentDidMount() {
    fetch(
      'https://pixabay.com/api/?key=22516391-185885990a61958acb3a57b33&q=yellow+flowers&image_type=photo&pretty=true',
    )
      .then(res => res.json())
      .then(image => this.setState({ image }));
  }

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    );
  }
}


