import logo from "./bioconductor_logo_rgb.svg";
import "./AppCommon.css";
import "./AppHeader.css";

function AppHeader() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
  );
}

export default AppHeader;
