import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageBlock = ({ content, onContentChange }) => {
  const [url, setUrl] = useState(content?.url || '');

  useEffect(() => {
    onContentChange({ url });
  }, [url]);

  return (
    <div className="image-block max-w-sm">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter image URL"
        className='input input-bordered w-full max-w-xs'
      />
      {url && <img src={url} alt="Report image" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

ImageBlock.propTypes = {
  content: PropTypes.object.isRequired,
  onContentChange: PropTypes.func.isRequired,
};

export default ImageBlock;
