import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const TableBlock = ({ content, onContentChange }) => {
  const [rows, setRows] = useState(content?.rows || 2);
  const [columns, setColumns] = useState(content?.columns || 2);
  const [cellData, setCellData] = useState(content?.cellData || []);

  useEffect(() => {
    if (cellData.length === 0) {
      const initialData = Array(rows).fill().map(() => Array(columns).fill(''));
      setCellData(initialData);
    }
  }, []);

  useEffect(() => {
    onContentChange({ rows, columns, cellData });
  }, [rows, columns, cellData]);

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newCellData = [...cellData];
    newCellData[rowIndex][colIndex] = value;
    setCellData(newCellData);
  };

  const renderTable = () => {
    const table = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(
          <td key={`cell-${i}-${j}`} className="border-solid border-2 border-sky-500">
            <input
              type="text"
              value={cellData[i]?.[j] || ''}
              onChange={(e) => handleCellChange(i, j, e.target.value)}
              className="w-full h-full"
            />
          </td>
        );
      }
      table.push(<tr key={`row-${i}`}>{row}</tr>);
    }
    return table;
  };

  return (
    <>
    <div className="table-block overflow-x-auto border-solid w-full max-w-xs">
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
  onContentChange: PropTypes.func.isRequired,
};

export default TableBlock;
