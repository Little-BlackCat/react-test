import Container from "../components/Container"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="home">

      <Link className="container" to="/test1">
        <Container title={t("test1")} desc={t("desc1")} />
      </Link>

      <Link className="container disable" to="">
        <Container title={t("test2")} desc={t("desc2")} />
      </Link>

      <Link className="container" to="/test3">
        <Container title={t("test3")} desc={t("desc3")} />
      </Link>

    </div>
  )
}

export default Home