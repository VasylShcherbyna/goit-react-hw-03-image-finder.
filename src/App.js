import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Componnent/Searchbar/Searchbar';
import ImageGallery from './Componnent/ImageGallery/ImageGallery';
import * as imagesApi from './Componnent/Services/images-api';
import Button from './Componnent/Button/Button';
import Loader from './Componnent/Loader/Loader';
import Modal from './Componnent/Modal/Modal';
import styles from './App.module.css';

export default class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    images: [],
    pageNumber: 1,
    search: '',
    error: null,
    isLoading: false,
    isModalOpen: false,
    largeImageId: null,
    largeImage: [],
  };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchImages(false);
    }
  }

  onSearch = search => {
    this.setState({ search, images: [], pageNumber: 1 });
  };

  fetchImagesWithScroll = () => {
    this.fetchImages(true);
  };

  fetchImages = scroll => {
    this.setState({ isLoading: true });
    const { search, pageNumber } = this.state;
    imagesApi
      .fetchImages(search, pageNumber)
      .then(images => {
        this.setState(state => ({
          images: [...state.images, ...images],
          pageNumber: state.pageNumber + 1,
        }));
        return images[0];
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      })
      .then(firstLoadedImage => {
        if (scroll) {
          const { id } = firstLoadedImage;
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
  };

  findPic = () => {
    const largeImg = this.state.images.find(image => {
      return image.id === this.state.largeImageId;
    });
    return largeImg;
  };

  openModal = e => {
    this.setState({
      isModalOpen: true,
      largeImageId: Number(e.currentTarget.id),
    });
  };
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { isLoading, images, isModalOpen, largeImageId } = this.state;

    return (
      <div className={styles.App}>
        {this.state.error && (
          <h2 className={styles.error}>
            No pictures were found for your query
          </h2>
        )}
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery openModal={this.openModal} images={images} />
        {isLoading && <Loader />}
        {images.length > 0 ? (
          <Button fetchImages={this.fetchImagesWithScroll} />
        ) : (
          <div className={styles.Warning}>
            You have to write down right word for search
          </div>
        )}
        {isModalOpen && (
          <Modal largeImageId={largeImageId} onClose={this.closeModal}>
            <img src={this.findPic().largeImageURL} alt={this.findPic().tags} />
          </Modal>
        )}
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }
}
