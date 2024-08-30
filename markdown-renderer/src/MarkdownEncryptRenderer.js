import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownEncryptRenderer = () => {
  const [markdown, setMarkdown] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  };

  const handleEncrypt = () => {
    try {
      const ciphertext = CryptoJS.AES.encrypt(markdown, privateKey).toString();
      setEncryptedText(ciphertext);
    } catch (error) {
      alert('Encryption failed. Please check your private key and markdown content.');
    }

    handleCopyToClipboard();
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(encryptedText).then(() => {
      alert('Copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formMarkdown">
          <Form.Label>Markdown</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Enter your markdown here"
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
        <Button variant="primary" onClick={handleEncrypt}>
          Encrypt
        </Button>
      </Form>
      <div style={{ marginTop: '20px', marginLeft: '20%'} }>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="blog-post">
          {markdown}
        </ReactMarkdown>
      </div>
      {/* {encryptedText && (
        <div style={{ marginTop: '20px' }}>
          <Button variant="secondary" onClick={handleCopyToClipboard}>
            Copy to Clipboard
          </Button>
          <Form.Control
            as="textarea"
            rows={10}
            value={encryptedText}
            readOnly
            style={{ marginTop: '10px' }}
          />
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {encryptedText}
          </ReactMarkdown>
        </div>
      )} */}
    </div>
  );
};

export default MarkdownEncryptRenderer;