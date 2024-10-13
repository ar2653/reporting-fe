import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TextBlock = ({ content, onContentChange }) => {
  const [text, setText] = useState(content?.text || '');

  useEffect(() => {
    onContentChange({ text });
  }, [text]);

  return (
    <div className="text-block w-full max-w-xs">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here"
        className='textarea textarea-success'
      />
    </div>
  );
};

TextBlock.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
};

export default TextBlock;
