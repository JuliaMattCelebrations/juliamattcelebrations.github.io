// src/About.js
import React from 'react';

const About = () => {
  return (
    <div className="About">
      <header className="About-header">
        <h2>About Our Celebration</h2>
      </header>
      <main>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">🎉 One Year Anniversary! 🎉</h5>
                  <p className="card-text">
                    This website celebrates our special day and the beautiful journey we've shared together.
                    From the bustling streets of New York to the serene parks of Hawaii, every moment has been magical.
                  </p>
                  <p className="card-text">
                    The encrypted notes contain special messages that only you can unlock with the right key.
                    Use the Tools page to encrypt and decrypt your own special messages.
                  </p>
                  <div className="text-center mt-4">
                    <p className="text-muted">
                      "Love is not about finding the right person, but creating the right relationship." 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
