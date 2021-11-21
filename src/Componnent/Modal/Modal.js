import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const MODAL_ROOT = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  const handleKeyPress = e => {
    if (e.code !== 'Escape') {
      return;
    }
    onClose();
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  });

  return createPortal(
    <div
      className={styles.Overlay}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className={styles.Modal}>{children}</div>
    </div>,
    MODAL_ROOT,
  );
}
