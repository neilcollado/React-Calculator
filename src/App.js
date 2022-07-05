import "./style.css"

function App() {
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev">123 *</div>
        <div className="current">1234512</div>
      </div>
      <button className="gray-btn">AC</button>
      <button className="gray-btn">&#43;/&#8722;</button>
      <button className="gray-btn">&#37;</button>
      <button className="operator">&#247;</button>
      <button className="number">7</button>
      <button className="number">8</button>
      <button className="number">9</button>
      <button className="operator">&#215;</button>
      <button className="number">4</button>
      <button className="number">5</button>
      <button className="number">6</button>
      <button className="operator">&#8722;</button>
      <button className="number">1</button>
      <button className="number">2</button>
      <button className="number">3</button>
      <button className="operator">&#43;</button>
      <button className="span-two number">0</button>
      <button className="number">.</button>
      <button className="operator">&#61;</button>
    </div>
  );
}

export default App;
