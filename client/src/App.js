import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard, Register, Error, Landing } from './pages';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route
          path="*"
          element={
            <Error text="We can't seem to find the page you're looking for" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
