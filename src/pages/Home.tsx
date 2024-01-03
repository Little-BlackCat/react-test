import Container from "../components/Container";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "../components/Navbar";

const Home = () => {
  const { Header, Content } = Layout;
  const { t } = useTranslation();

  return (
    <Layout className="layout">
      <Header data-testid="header" className="header">
        <Navbar />
      </Header>
      <Content data-testid="main" className="main">
        <div data-testid="home" className="home">
          <Link className="container" to="/react-test/test1">
            <Container title={t("test1")} desc={t("desc1")} />
          </Link>

          <Link className="container disable" to="">
            <Container title={t("test2")} desc={t("desc2")} />
          </Link>

          <Link className="container" to="/react-test/test3">
            <Container title={t("test3")} desc={t("desc3")} />
          </Link>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
