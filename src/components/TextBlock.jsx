import { useState } from 'react';
import PropTypes from 'prop-types';

const TextBlock = ({ content }) => {
  const [text, setText] = useState(content?.text || '');

  return (
    <div className="text-block">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here"
      />
    </div>
  );
};

TextBlock.propTypes = {
    content: PropTypes.string.isRequired,
};

export default TextBlock;
