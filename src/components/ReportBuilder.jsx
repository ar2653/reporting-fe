import { useState } from "react";
import TextBlock from "./TextBlock";
import TableBlock from "./TableBlock";
import ImageBlock from "./ImageBlock";
const ReportBuilder = () => {
  const [elements, setElements] = useState([]);

  const addElement = (type) => {
    const newElement = {
      id: `element-${elements.length + 1}`,
      type,
      content: {},
    };
    setElements([...elements, newElement]);
  };

  const updateElementContent = (id, newContent) => {
    setElements(
      elements.map((element) =>
        element.id === id ? { ...element, content: newContent } : element
      )
    );
  };

  const renderElement = (element) => {
    const props = {
      key: element.id,
      content: element.content,
      className: "m-4 p-2",
      onContentChange: (newContent) =>
        updateElementContent(element.id, newContent),
    };
    switch (element.type) {
      case "text":
        return <TextBlock {...props} />;
      case "image":
        return <ImageBlock className="m-4 p-2" {...props} />;
      case "table":
        return <TableBlock className="m-4 p-2" {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="report-builder min-w-96">
      <h1>Report Builder</h1>
      <div className="toolbar">
        <button
          className="btn btn-neutral p-2 m-3"
          onClick={() => addElement("text")}
        >
          Add Text
        </button>
        <button
          className="btn btn-neutral p-2 m-3"
          onClick={() => addElement("table")}
        >
          Add Table
        </button>
        <button
          className="btn btn-neutral p-2 m-3"
          onClick={() => addElement("image")}
        >
          Add Image
        </button>
      </div>
      <div className="report-container min-w-96 m-3 p-2">
        {elements.map((element) =>
          renderElement(element, updateElementContent)
        )}
      </div>
    </div>
  );
};

export default ReportBuilder;
