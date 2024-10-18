const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

const findPathDFS = (grid, start, end) => {
  const [rows, cols] = [20, 20];
  let visited = Array(rows)
    .fill()
    .map(() => Array(cols).fill(false));
  let path = [];

  const dfs = (row, col) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col])
      return false;

    visited[row][col] = true;
    path.push({ row, col });

    if (row === end.row && col === end.col) return true;
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    for (let [dx, dy] of directions) {
      if (dfs(row + dx, col + dy)) return true;
    }

    path.pop();
    return false;
  };

  dfs(start.row, start.col);
  return path;
};

app.post("/find-path", (req, res) => {
  const { start, end } = req.body;
  const grid = Array(20)
    .fill()
    .map(() => Array(20).fill(false));

  const path = findPathDFS(grid, start, end);
  res.json({ path });
});

app.listen(3000, () => console.log("Server running on port 3000"));
