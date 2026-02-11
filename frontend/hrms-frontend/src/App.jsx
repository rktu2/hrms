import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import { Toaster } from "react-hot-toast";

export default function App() {

  return (
    <BrowserRouter>
      <Toaster />

      <MainLayout>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>

      </MainLayout>

    </BrowserRouter>
  );
}
