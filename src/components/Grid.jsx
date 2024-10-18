import { useState } from "react";
import axios from "axios";

let initialGrid = Array(20).fill(Array(20).fill(false));

export const Grid = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [startTile, setStartTile] = useState(null);
  const [endTile, setEndTile] = useState(null);
  const [path, setPath] = useState([]);

  const handleTileClick = (row, col) => {
    if (!startTile) {
      setStartTile({ row, col });
    } else if (!endTile) {
      setEndTile({ row, col });
      findPath(startTile, { row, col });
    }
  };

  const findPath = async (start, end) => {
    try {
      const response = await axios.post("http://localhost:3000/find-path", {
        start,
        end,
      });
      setPath(response.data.path);
    } catch (error) {
      console.error("Error finding path:", error);
    }
  };

  const resetGrid = () => {
    setGrid(initialGrid);
    setStartTile(null);
    setEndTile(null);
    setPath([]);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 30px)",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleTileClick(rowIndex, colIndex)}
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: path.some(
                  (p) => p.row === rowIndex && p.col === colIndex
                )
                  ? "blue"
                  : startTile &&
                    startTile.row === rowIndex &&
                    startTile.col === colIndex
                  ? "green"
                  : endTile &&
                    endTile.row === rowIndex &&
                    endTile.col === colIndex
                  ? "red"
                  : "lightgray",
                border: "1px solid black",
              }}
            />
          ))
        )}
      </div>
      <button
        style={{
          marginTop: "1rem",
          backgroundColor: "crimson",
          color: "whitesmoke",
        }}
        onClick={resetGrid}
      >
        Reset Grid
      </button>
    </>
  );
};
