import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Register from "../components/Register";


const Test3 = () => {
  const { Header, Content } = Layout;
  const { t } = useTranslation();

  return (
    <Layout className="layout">
      <Header className="header">
        <Navbar />
      </Header>
      <Content className="main">
        <div className="test">
          <h1>{t("desc3")}</h1>
        </div>

        <Register />

      </Content>
    </Layout>
  );
};

export default Test3;
