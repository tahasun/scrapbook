import styled from "styled-components";

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

export const Tile = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <Wrapper>
      <img src={imgSrc} />
    </Wrapper>
  );
};
