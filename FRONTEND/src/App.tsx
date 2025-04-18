import { Routes, Route } from "react-router";
import { _Layout, Landing, Login, Signup } from "./pages";

function App() {
  return (
    <div className="h-screen flex bg-gray-100">
      <Routes>
        <Route path="/" element={<_Layout />}>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
