import logo from "./bioconductor_logo_rgb.svg";
import "./App.css";
import AppAbout from "./AppAbout";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <AppAbout />
    </div>
  );
}

export default App;
