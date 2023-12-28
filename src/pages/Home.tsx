import Container from "../components/Container"
import { useTranslation } from "react-i18next"

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="home">
      <Container title={t("test1")} desc={t("desc1")} />
      <Container title={t("test2")} desc={t("desc2")} />
      <Container title={t("test3")} desc={t("desc3")} />
    </div>
  )
}

export default Home