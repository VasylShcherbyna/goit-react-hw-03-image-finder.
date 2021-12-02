import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Componnent/Searchbar/Searchbar';
import ImageGallery from './Componnent/ImageGallery/ImageGallery';
import * as imagesApi from './Componnent/Services/images-api';
import Button from './Componnent/Button/Button';
import Loader from './Componnent/Loader/Loader';
import Modal from './Componnent/Modal/Modal';
import styles from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageId, setLargeImageId] = useState(null);
  const [largeImage, setLargeImage] = useState([]);

  useEffect(() => {
    fetchImages(false);
  }, [search]);

  const onSearch = search => {
    setSearch(search);
    setImages([]);
    setPageNumber(1);
  };

  const fetchImagesWithScroll = () => {
    fetchImages(true);
  };

  const fetchImages = scroll => {
    setIsLoading(true);
    imagesApi
      .fetchImages(search, pageNumber)
      .then(images => {
        setImages(
          state => [...state, ...images],
          setPageNumber(pageNumber + 1),
        );
        return images[0];
      })

      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
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

  const findPic = () => {
    const largeImg = images.find(image => {
      return image.id === largeImageId;
    });
    return largeImg;
  };

  const openModal = e => {
    setIsModalOpen(true);
    setLargeImageId(Number(e.currentTarget.id));
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.App}>
      {error && (
        <h2 className={styles.error}>No pictures were found for your query</h2>
      )}
      <Searchbar onSubmit={onSearch} />
      <ImageGallery openModal={openModal} images={images} />
      {isLoading && <Loader />}
      {images.length > 0 ? (
        <Button fetchImages={fetchImagesWithScroll} />
      ) : (
        <div className={styles.Warning}>
          You have to write down right word for search
        </div>
      )}
      {isModalOpen && (
        <Modal largeImageId={largeImageId} onClose={closeModal}>
          <img src={findPic().largeImageURL} alt={findPic().tags} />
        </Modal>
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
