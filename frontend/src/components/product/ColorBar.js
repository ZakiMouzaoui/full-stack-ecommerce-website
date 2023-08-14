import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ColorBar = ({ colors }) => {
  const dispatch = useDispatch();
  const selectedColor = useSelector((state) => state.Product.selectedColor);

  useEffect(() => {
    dispatch({ type: "SELECT_COLOR", selectedColor: null });
  }, [dispatch]);

  const selectColor = (color) => {
    dispatch({ type: "SELECT_COLOR", selectedColor: color });
  };

  return (
    <div className="d-flex">
      <p className="me-2">
        <b>Colors: </b>
      </p>
      <div className="d-flex">
        {colors.map((color) => {
          return (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                height: "30px",
                width: "54px",

                border: ` solid ${
                  selectedColor === color ? "2px orange" : "1px grey"
                }`,
                // borderRadius: "50%",
                marginRight: "1em",
                cursor: "pointer",
                // position: "relative",
              }}
              onClick={() => selectColor(color)}
            >
              <div
                style={{
                  backgroundColor: `${color}`,
                  height: "25px",
                  width: "49px",
                  // position: "absolute",
                  // top: 0,
                  // left: 0,
                  // bottom: 0,
                  // right: 0,
                  // margin: "auto",
                  border: "1px solid grey",
                }}
              >
                ,
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(ColorBar);
