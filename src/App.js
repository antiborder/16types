import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NoMatch from './pages/NoMatch';
import Type from './pages/types/type';
import Typology from './pages/Typology';
import CognitiveFunction from './pages/CognitiveFunction';
import TypeLabel from './pages/TypeLabel';

function App() {
  return (
    <>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home/>} />
        <Route path={`${process.env.PUBLIC_URL}/pages/types/1`} element={<Type type = {1} />} />
        <Route path={`${process.env.PUBLIC_URL}/pages/typology`} element={<Typology/>} />
        <Route path={`${process.env.PUBLIC_URL}/pages/function`} element={<CognitiveFunction/>} />
        <Route path={`${process.env.PUBLIC_URL}/pages/type-label`} element={<TypeLabel/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export {App};

const App2=()=> {
  return (
    <>
      <Routes>
         {/* <Route path={`${process.env.PUBLIC_URL}/`} element={<Home/>} />
        <Route path={`${process.env.PUBLIC_URL}/pages/types/1`} element={<Type type = {1} />} />
        <Route path={`${process.env.PUBLIC_URL}/pages/typology`} element={<Typology/>} />
        <Route path={`${process.env.PUBLIC_URL}/pages/function`} element={<CognitiveFunction/>} />
        <Route path={`${process.env.PUBLIC_URL}/pages/type-label`} element={<TypeLabel/>} />
        <Route path="pages/*" element={<NoMatch />} /> */}
      </Routes>
    </>
  );
}

export {App2};