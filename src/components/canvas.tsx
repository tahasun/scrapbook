import { observer } from "mobx-react-lite";
import { Circle, Layer, Rect, Stage, Image } from "react-konva";
import styled from "styled-components";
import useImage from "use-image";
import { pageStore } from "../stores/page.store";

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

  const [image] = useImage("https://konvajs.org/assets/lion.png");
  pageStore.addObject(pageStore.pages[0].id, "", {
    image,
    x: 500,
    y: 100,
    width: 100,
    height: 100,
  });

  pageStore.addObject(pageStore.pages[1].id, "", {
    image,
    x: 100,
    y: 200,
    width: 100,
    height: 100,
  });

  const layers = pageStore.currentLayer;

  return (
    <Wrapper>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={CanvasStyles}
      >
        {/* <Layer>
          <Image image={image} x={500} y={100} width={100} height={100} />
        </Layer>
        <Layer>
          <Image
            image={image}
            x={100}
            y={200}
            width={100}
            height={100}
            fill="red"
          />
        </Layer> */}
        {layers?.map((layer) => (
          <Layer>{layer.objects.map((obj) => {})}</Layer>
        ))}
      </Stage>
    </Wrapper>
  );
});
