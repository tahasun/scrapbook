import { observer } from "mobx-react-lite";
import { Circle, Layer, Rect, Stage, Image, Group } from "react-konva";
import styled from "styled-components";
import useImage from "use-image";
import { pageStore } from "../stores/page.store";
import { useEffect, useMemo, useRef, useState } from "react";
import { KImage, KObject } from "../utils/types/konva-types";

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

// todo: width must grow +1 innerWidth from the last element page on the page

export const Canvas = observer(() => {
  const layers = useMemo(() => {
    // console.log(pageStore.curPage, pageStore.layers);
    return pageStore.curPage != null ? pageStore.layers[pageStore.curPage] : [];
  }, [pageStore.curPage, pageStore.layers]);

  // todo: we need to figure out how to extract the images that we need into image elements
  // to be consumed by the Konva Canvas Image Obj
  const images = useMemo(() => {
    const urls = layers.forEach((layer) => {
      return layer.objects
        .filter((obj) => obj.url != null)
        .map((obj) => obj.url);
    });
  }, [pageStore.curPage]);

  return (
    <Wrapper>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={CanvasStyles}
      >
        {/* {layers?.map((layer) => {
          return (
            <Layer key={layer.id}>
              {layer.objects.map((obj) => {
                const [imgEl] = useImage(obj.url);
                return (
                  <Image
                    image={imgEl}
                    x={obj.x}
                    y={obj.y}
                    width={obj.width}
                    height={obj.height}
                  />
                );
              })}
            </Layer>
          );
        })} */}
      </Stage>
    </Wrapper>
  );
});
