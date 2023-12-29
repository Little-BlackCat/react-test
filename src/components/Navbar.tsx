import { Link } from "react-router-dom"
import Languages from "./Languages"

const Navbar = () => {
  return (
    <div className="nav">
      <div className="menu">
        <Languages />
        <Link to="/">
          <img className="home-icon" src="/public/home.png" alt="home" />
        </Link>
      </div>
    </div>
  )
}

export default Navbar