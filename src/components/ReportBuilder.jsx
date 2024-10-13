import { useState } from "react";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import TableBlock from "./TableBlock";
import GraphBlock from "./GraphBlock";
import axios from "axios";

const ReportBuilder = () => {
  const [elements, setElements] = useState([]);
  const [reportName, setReportName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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

  const addReport = () => {
    const record = {
      reportName: reportName,
      elements: elements
    };

    axios.post("http://127.0.0.1:8082/record", record)
      .then((response) => {
        console.log("Report saved with ID:", response.data.id);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((error) => {
        console.error("Error saving report:", error);
      });
  };

  const getReport = () => {
    if (!reportName.trim()) {
      console.error("Please enter a report name");
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/record/${encodeURIComponent(reportName.trim())}`)
      .then((response) => {
        console.log("Report fetched:", response.data)
        setElements(response.data.elements || []);
        setReportName(response.data.reportName || "");
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
      });
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
      case "graph":
        return <GraphBlock className="m-4 p-2" {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="report-builder min-w-96">
      <h1 className="text-2xl font-bold mt-3 p-3">Report Builder</h1>
      {showAlert && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Your report has been saved successfully!</span>
        </div>
      )}
      <div className="report-name mt-3 p-3">
        <input
          type="text"
          value={reportName}
          onChange={(e) => setReportName(e.target.value)}
          placeholder="Enter Report Name"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="toolbar">
        <button
          className="btn btn-neutral p-2 m-3"
          onClick={() => addElement("text")}
        >
          Add Text
        </button>
        <button
          className="btn btn-neutral p-2 m-3"
          onClick={() => addElement("image")}
        >
          Add Image
        </button>
        <button
          className="btn btn-neutral p-2 m-3"
          onClick={() => addElement("table")}
        >
          Add Table
        </button>
        <button
          className="btn btn-neutral p-2 m-3"
          onClick={() => addElement("graph")}
        >
          Add Graph
        </button>
        <button className="btn btn-success p-2 m-3" onClick={() => addReport()}>
          Save Report
        </button>
        <button className="btn btn-info p-2 m-3" onClick={() => getReport()}>
          GET Report
        </button>
      </div>

      <div className="report-container min-w-96 m-3 p-2">
        {elements.map((element, index) =>
          renderElement(element, updateElementContent, index)
        )}
      </div>
    </div>
  );
};

export default ReportBuilder;
