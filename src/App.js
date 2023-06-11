import Home from './pages/Home';
import { Routes, Route, Link } from 'react-router-dom';
import NoMatch from './pages/NoMatch';
import Type from './pages/types/type'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/pages/types/1" element={<Type type = {1} />} />
        <Route path="/test" element={<>
            <Link to="/" >link</Link>
            <h1>Hello React Router v6</h1>
            </>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;