import React, { useState } from 'react';

const ToggleableText = ({ text, maxChars }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const getDisplayedText = () => {
    if (showFullText) {
      return text;
    } else {
      return text.length > maxChars ? `${text.slice(0, maxChars)}...` : text;
    }
  };

  return (
    <div>
      <p>{getDisplayedText()}</p>
      {text.length > maxChars && (
        <div onClick={toggleText} className='clickable fw-bold'>
          {showFullText ? 'Show Less' : 'Show More'}
        </div>
      )}
    </div>
  );
};

export default ToggleableText;