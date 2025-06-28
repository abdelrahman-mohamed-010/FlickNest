import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import App from "./App.jsx";
import { queryClient } from "./util/http.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);