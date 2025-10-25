import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicationConsole from "./Pages/ApplicationConsole";
import ApplicationDetails from "./Pages/ApplicationDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ApplicationConsole />} />
        <Route path="/applications/:id" element={<ApplicationDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
