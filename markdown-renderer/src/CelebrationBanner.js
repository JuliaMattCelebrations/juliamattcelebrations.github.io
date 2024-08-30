import React, { useState } from 'react';
import './CelebrationBanner.css';
import EncryptedMarkdownRenderer from './EncryptedMarkdownRenderer';

const CelebrationBanner = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <div className="celebration-banner">
      <h1>🎉 ONE YAD! 🎉</h1>
      <p>Here's a riddle for you (3 parts):</p>
      <blockquote>
        <strong>Part 1:</strong><br />
        <p>
          "She waddles on water, quacking with glee. <br />
          In Hawaii's warm sun, she feels so free. <br />
          From New York's skyline to Jollyman Park, <br />
          I love her beautiful smile on each journey we embark.<br />

          My journey's complete with a name that's dear. <br />
          The one I adore, who always is near.<br />

          Today is the day we tangled in love, stuck by you" <br />
        </p>
        <strong>Part 2:</strong>
        <p>mmdd</p>
        <strong>Part 3 (Matt's version):</strong>
        <p>I am so brat. I am so _____ LA LA LA LA LA</p>

      </blockquote>
      <EncryptedMarkdownRenderer filePath="/encrypted-wub-note.md" />
    </div>
  );
};

export default CelebrationBanner;