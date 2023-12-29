import { Link } from "react-router-dom"
import Languages from "./Languages"

const Navbar = () => {
  return (
    <div className="nav">
      <Link to="/">
        <img className="home-icon" src="/public/home.png" alt="home" />
      </Link>
      <Languages />
    </div>
  )
}

export default Navbar