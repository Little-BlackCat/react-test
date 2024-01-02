import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  moveLeft,
  moveRight,
  random,
  moveSelector,
  movePosition,
} from "../store/slices/moveSlice";
import { useAppDispatch } from "../store/store";
import { Flex, Layout } from "antd";
import Navbar from "../components/Navbar";

const Test1 = () => {
  const { Header, Content } = Layout;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const moveReducer = useSelector(moveSelector);

  return (
    <Layout className="layout">
      <Header className="header">
        <Navbar />
      </Header>
      <Content className="main">
        <div className="test">
          <h1>{t("desc1")}</h1>

          <Flex className="command" gap="middle">
            <div
              className="background"
              onClick={() => {
                dispatch(moveLeft(moveReducer.shapeList));
              }}
            >
              <div className="triangle left"></div>
              <p className="move">{t("shape")}</p>
            </div>
            <div
              className="background middle"
              onClick={() => dispatch(movePosition())}
            >
              <div className="triangle"></div>
              <div className="triangle down"></div>
              <p className="move">{t("position")}</p>
            </div>
            <div
              className="background"
              onClick={() => {
                dispatch(moveRight(moveReducer.shapeList));
              }}
            >
              <div className="triangle right"></div>
              <p className="move">{t("shape")}</p>
            </div>
          </Flex>

          <hr className="line" />

          <div className={moveReducer.position}>
            <Flex gap="middle" className="top-result">
              {moveReducer.shapeList.map(
                (shape, index) =>
                  index < 3 && (
                    <div
                      key={index}
                      className="background"
                      onClick={() => {
                        dispatch(random());
                      }}
                    >
                      <div className={`${shape} pic-cursor`}></div>
                    </div>
                  )
              )}
            </Flex>

            <Flex gap="middle" className="bottom-result">
              {moveReducer.shapeList.map(
                (shape, index) =>
                  index >= 3 && (
                    <div
                      key={index}
                      className="background"
                      onClick={() => {
                        dispatch(random());
                      }}
                    >
                      <div className={`${shape} pic-cursor`}></div>
                    </div>
                  )
              )}
            </Flex>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Test1;
