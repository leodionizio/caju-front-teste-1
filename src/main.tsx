import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import LogRocket from "logrocket";

LogRocket.init("en9sos/caju-front-test");

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
