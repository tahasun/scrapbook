import styled from "styled-components";
import { Image } from "./media-uploader";
import { observer } from "mobx-react-lite";
import { pageStore } from "../stores/page.store";

const Wrapper = styled.div`
  height: 10vh;
  width: auto;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 6px;

  & > img {
    height: 100%;
    width: auto;
    // border-radius: 6px;
  }
`;

export const TileGrid = styled.div`
  --left-offset: 2vw;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1vw;
  height: 26vh;
  overflow-y: scroll;
  scrollbar-color: white var(--dark-tint);
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scroll-snap-align: start;
  scroll-padding-top: 2vh;
  overflow-x: hidden;
  padding: var(--left-offset) var(--left-offset);
`;

export const Tile = observer(({ img }: { img: Image }) => {
  const handleDrop = (e: React.DragEvent<HTMLImageElement>, img: Image) => {
    // we are adding to a new layer to the cur page
    if (pageStore.curPage == null) {
      return; // cant do anything you can throw error todo!!
    }
    const newLayer = pageStore.addLayer(pageStore.curPage);
    pageStore.addObject(pageStore.curPage, newLayer, {
      url: img.url,
      x: e.screenX,
      y: e.screenY,
      width: 100,
      height: 100,
    });
    console.log("added stuff", img.url);
  };

  return (
    <Wrapper>
      <img src={img.url} onDragEnd={(e) => handleDrop(e, img)} />
    </Wrapper>
  );
});
