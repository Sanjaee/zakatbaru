import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableZakat from "./TableZakat";
import { InputZakat } from "./InputZakat";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={TableZakat} />
        <Route path="/zakat" Component={InputZakat} />
      </Routes>
    </BrowserRouter>
  );
};
