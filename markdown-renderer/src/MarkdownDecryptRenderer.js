import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownDecryptRenderer = () => {
  const [encryptedMarkdown, setEncryptedMarkdown] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [decryptedMarkdown, setDecryptedMarkdown] = useState('');
  const [error, setError] = useState('');

  const handleEncryptedMarkdownChange = (event) => {
    setEncryptedMarkdown(event.target.value);
  };

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
    } catch (error) {
      setError('Decryption failed. Please check your private key and try again.');
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(decryptedMarkdown).then(() => {
      alert('Copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formEncryptedMarkdown">
          <Form.Label>Encrypted Markdown</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={encryptedMarkdown}
            onChange={handleEncryptedMarkdownChange}
            placeholder="Enter your encrypted markdown here"
          />
        </Form.Group>
        <Form.Group controlId="formPrivateKey">
          <Form.Label>Private Key</Form.Label>
          <Form.Control
            type="text"
            value={privateKey}
            onChange={handlePrivateKeyChange}
            placeholder="Enter your private key"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleDecrypt}>
          Decrypt and Render
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Form>
      {decryptedMarkdown && (
        <div style={{ marginTop: '20px' }}>
          <Button variant="secondary" onClick={handleCopyToClipboard}>
            Copy to Clipboard
          </Button>
          <Form.Control
            as="textarea"
            rows={10}
            value={decryptedMarkdown}
            readOnly
            style={{ marginTop: '10px' }}
          />
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {decryptedMarkdown}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default MarkdownDecryptRenderer;