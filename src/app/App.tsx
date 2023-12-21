import Home from "../pages/home/Home.tsx";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import Logs from "../pages/log/Logs.tsx";
import NotFound from "../pages/404/404.tsx";
import Login from "../pages/login/Login.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { JSX } from "react";
import FallBackUI from "../pages/fallbackUI/FallBackUI.tsx";

function App(): JSX.Element {
  return (
    <>
      <ErrorBoundary
        fallbackRender={FallBackUI}
        onReset={() => location.reload()}
      >
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="logs" element={<Logs />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
