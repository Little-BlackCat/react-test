import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { moveLeft, moveRight, random, moveSelector, movePosition } from "../store/slices/moveSlice";
import { useAppDispatch } from "../store/store";

const Test1 = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const moveReducer = useSelector(moveSelector)
  
  return (
    <div className="test">
      <h1>{t("desc1")}</h1>

      <div className="command">
        <div className="background"
          onClick={() => {
            dispatch(moveLeft(moveReducer.shapeList))
          }}
        >
          <div className="triangle left"></div>
          <p className="move">{t("shape")}</p>
        </div>
        <div className="background middle"
          onClick={() =>
            dispatch(movePosition())
          }
        >
          <div className="triangle"></div>
          <div className="triangle down"></div>
          <p className="move">{t("position")}</p>
        </div>
        <div className="background"
          onClick={() => {
            dispatch(moveRight(moveReducer.shapeList))
          }}
        >
          <div className="triangle right"></div>
          <p className="move">{t("shape")}</p>
        </div>
      </div>

      <hr className="line" />

      <div className={moveReducer.position}>
        <div className="command top-result">
          {moveReducer.shapeList.map((shape, index) => 
            index < 3 && (
              <div key={index} className="background" 
                onClick={() => {
                  dispatch(random())
                }}
              >
                <div className={`${shape} pic-cursor`}></div>
              </div>
            )
          )}
        </div>

        <div className="command bottom-result">
          {moveReducer.shapeList.map((shape, index) => 
            index >= 3 && (
              <div key={index} className="background" 
                onClick={() => {
                  dispatch(random())
                }}
              >
                <div className={`${shape} pic-cursor`}></div>
              </div>
            )
          )}
        </div>
      </div>

    </div>
  );
};

export default Test1;
