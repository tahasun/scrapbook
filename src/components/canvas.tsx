import { observer } from "mobx-react-lite";
import { Circle, Layer, Rect, Stage } from "react-konva";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow-y: hidden;
`;

const CanvasStyles = {
  backgroundColor: "white",
  maxHeight: "98vh",
  //   border: "2px solid yellow",
};

export const Canvas = observer(() => {
  // width must grow +1 innerWidth from the last element page on the page
  return (
    <Wrapper>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={CanvasStyles}
      >
        <Layer>
          <Rect width={50} height={50} x={100} y={200} fill="red" />
          <Circle x={200} y={200} stroke="black" radius={50} />
        </Layer>
      </Stage>
    </Wrapper>
  );
});
