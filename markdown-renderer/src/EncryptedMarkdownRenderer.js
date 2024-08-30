import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CryptoJS from 'crypto-js';
import Confetti from 'react-confetti';
import { Form, Button, Container, Modal } from 'react-bootstrap';

const EncryptedMarkdownRenderer = ({ filePath }) => {
  const [privateKey, setPrivateKey] = useState('');
  const [encryptedMarkdown, setEncryptedMarkdown] = useState('');
  const [decryptedMarkdown, setDecryptedMarkdown] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Fetch the encrypted markdown file from the repository
    fetch(filePath)
      .then(response => response.text())
      .then(data => setEncryptedMarkdown(data))
      .catch(error => console.error('Error fetching the file:', error));
  }, [filePath]);

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  };

  const handleDecrypt = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedMarkdown, privateKey);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        throw new Error('Decryption failed');
      }
      setDecryptedMarkdown(decryptedText);
      setShowModal(false); // Close the modal on successful decryption
      setShowButton(false);
      setShowConfetti(true); // Trigger confetti
      setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
    } catch (error) {
      setError('Decryption failed. Please check your private key and try again.');
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className="full-page-grid">
      {showConfetti && <Confetti />}
      {showButton && (
        <Button variant="primary" onClick={handleShowModal}  className="big-center-button">
          Unlock the secret message
        </Button>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {encryptedMarkdown} */}
          <Form>
            <Form.Group controlId="formPrivateKey">
              <Form.Label>Private Key</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the secret password"
                value={privateKey}
                onChange={handlePrivateKeyChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleDecrypt} style={{marginTop: 5}}>
              Decrypt
            </Button>
            {error && <p className="text-danger">{error}</p>}
        </Form>
        </Modal.Body>
      </Modal>

        <Container className="blog-post">
            {decryptedMarkdown && (
                <img src="/IMG_0007.JPG" className="blog-post-image"/>
            )}
            <div>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {decryptedMarkdown}
                </ReactMarkdown>
            </div>
        </Container>
    </Container>
  );
};

export default EncryptedMarkdownRenderer;