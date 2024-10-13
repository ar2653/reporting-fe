import PropTypes from 'prop-types';
import { useState } from 'react';

const TableBlock = ({ content }) => {
  const [rows, setRows] = useState(content?.rows || 2);
  const [columns, setColumns] = useState(content?.columns || 2);

  const renderTable = () => {
    const table = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(<td key={`cell-${i}-${j}`} contentEditable className="border-solid border-2 border-sky-500"></td>);
      }
      table.push(<tr key={`row-${i}`}>{row}</tr>);
    }
    return table;
  };

  return (
    <>
    <div className="table-block overflow-x-auto border-solid">
      <div>
        Rows: <input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} min="1" />
        Columns: <input type="number" value={columns} onChange={(e) => setColumns(Number(e.target.value))} min="1" />
      </div>
      <table className="table table-xs table-pin-rows table-pin-cols border-solid border-2 border-sky-500">
        <tbody>{renderTable()}</tbody>
      </table>
    </div>


</>
  );
};

TableBlock.propTypes = {
  content: PropTypes.object.isRequired,
};

export default TableBlock;
