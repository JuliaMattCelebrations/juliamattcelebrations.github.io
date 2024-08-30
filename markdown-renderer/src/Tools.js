// src/Tools.js
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import MarkdownEncryptRenderer from './MarkdownEncryptRenderer';
import MarkdownDecryptRenderer from './MarkdownDecryptRenderer';

const Tools = () => {
  const [key, setKey] = useState('encrypt');

  return (
    <div className="Tools">
      <header className="Tools-header">
        <h2>Tools</h2>
      </header>
      <main>
        <Tabs
          id="tools-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="encrypt" title="Encrypt">
            <MarkdownEncryptRenderer />
          </Tab>
          <Tab eventKey="decrypt" title="Decrypt">
            <MarkdownDecryptRenderer />
          </Tab>
        </Tabs>
      </main>
    </div>
  );
};

export default Tools;