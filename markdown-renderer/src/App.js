// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './App.css';
import Tools from './Tools';
import CelebrationBanner from './CelebrationBanner';
import EncryptedMarkdownRenderer from './EncryptedMarkdownRenderer';

function App() {
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    if (isNightMode) {
      document.documentElement.classList.add('night-mode');
    } else {
      document.documentElement.classList.remove('night-mode');
    }
  }, [isNightMode]);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <Router>
      <div className={`App ${isNightMode ? 'night-mode' : ''}`}>
        <Navbar bg={isNightMode ? 'dark' : 'light'} variant={isNightMode ? 'dark' : 'light'} expand="lg" fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img
                src="/logo512.png"
                alt="Logo"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Our Day Celebration
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/tools">Tools</Nav.Link>
              </Nav>
              <Nav className="ms-auto">
                <Button variant="secondary" onClick={toggleNightMode}>
                  {isNightMode ? '🌜 Night Mode' : '🌞 Day Mode'}
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <main className="main-content">
          <Routes>
            <Route path="/tools" element={<Tools />} />
            <Route path="" element={<CelebrationBanner />} />
            {/* <Route path="/" element={<EncryptedMarkdownRenderer filePath="/encrypted-wub-note.md" />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;