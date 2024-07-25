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

// so if i can keep track of layer ids and a way to render the layers on demand
// switching pages: each page object has a collection of ids
// given the page, render the layers associated with it
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
        </Layer>
        <Layer>
          <Circle x={200} y={200} stroke="black" radius={50} />
        </Layer>
      </Stage>
    </Wrapper>
  );
});
