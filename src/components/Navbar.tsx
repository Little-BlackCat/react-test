import { Link } from "react-router-dom"
import Languages from "./Languages"

const Navbar = () => {
  return (
    <div data-testid="navbar" className="nav">
      <div data-testid="menu" className="menu">
        <Languages />
        <Link data-testid="link" className="link-to-home" to="/">
          <img data-testid="home-icon" className="home-icon" src="/public/home.png" alt="home" />
        </Link>
      </div>
    </div>
  )
}

export default Navbar