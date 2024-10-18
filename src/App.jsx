import "./App.css";
import { Grid } from "./components/Grid";

function App() {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Path Finding Visualizer</h1>
        <h2>Algorithm: DFS</h2>
      </div>
      <span style={{ fontWeight: "700" }}>Steps to use:</span>
      <ul>
        <li>Click on the start cell to set it as the starting point.</li>
        <li>Click on the end cell to set it as the destination point.</li>
      </ul>
      <Grid />
    </>
  );
}

export default App;
