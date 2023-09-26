import React from "react";
import ReactDOM from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { CartProvider} from "./context/cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <CartProvider>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
    </CartProvider>
  </>
);
