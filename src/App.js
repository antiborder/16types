import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NoMatch from './pages/NoMatch';
import Type from './pages/types/type'
import Typology from './pages/Typology'

function App() {
  return (
    <>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home/>} />
        <Route path={`${process.env.PUBLIC_URL}/pages/types/1`} element={<Type type = {1} />} />
        <Route path={`${process.env.PUBLIC_URL}/test`} element={<>
              
            <h1>Hello React Router v6</h1>
            </>} />
        <Route path="*" element={<NoMatch />} />
        <Route path={`${process.env.PUBLIC_URL}/pages/typology`} element={<Typology/>} />
      </Routes>
    </>
  );
}

export default App;