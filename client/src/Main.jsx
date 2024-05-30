import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

//utility imports
import reduxStore from "./redux/main.js";
import { SocketContextProvider } from "./contextApi/socketContext.jsx";

//file imports || component imports
import App from "./App.jsx";
import "./assets/global.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={reduxStore}>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
