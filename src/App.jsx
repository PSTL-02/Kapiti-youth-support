import { HashRouter } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar';
import Links from './components/Links'
import Footer from './components/Footer';

const App = () => {

  return (
  <HashRouter>
    <Navbar/>
    <Links/>
    <Footer/>
  </HashRouter>
  )
}

export default App
