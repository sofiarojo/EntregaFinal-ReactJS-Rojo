import './NavBar.css';
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';

const NavBar= () => {
  return (
  <nav className="menu">
    <div className="navbar-left">
      <img className="logo" src={process.env.PUBLIC_URL + '/Yogaintro-favicon.png'} alt="Logo"/>
    </div>
    <div className="navbar-right">
      <ul>
        <li><Link to={'/'} className='link'>Inicio</Link></li>
        <li><Link to={'/category/cursos'} className='link'>Cursos</Link></li>
        <li><Link to={'/category/clases'} className='link'>Clases</Link></li>
        <li><Link to={'/category/elementos'} className='link'>Elementos</Link></li>
        <li><Link to={'/cart'} className='link'><CartWidget/></Link></li>
      </ul>
    </div>
  </nav>
  );
}

export default NavBar;