import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Footer from './Footer';
import ShoesForm from './ShoesForm';
import ShoesList from './ShoesList';
import HatsList from './HatsList';
import HatsFrom from './HatsForm';


function App(props) {
if (props.shoes === undefined || props.hats === undefined) {
  return null;
}
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
            <Route index element={<ShoesList shoes={props.shoes}/>} />
            <Route path="new" element={<ShoesForm /> } />
          </Route>
          <Route path="hats">
            <Route index element={<HatsList hats={props.hats}/>} />
            <Route path="new" element={<HatsFrom /> } />
          </Route>          
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
