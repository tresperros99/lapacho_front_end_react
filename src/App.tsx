import { FC } from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import ErrorBoundary from "./components/ErrorBoundary";

const App: FC = () => {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
};

export default App;
