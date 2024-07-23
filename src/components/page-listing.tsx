import { useState } from "react";
import styled, { css } from "styled-components";
import { Page, pageStore } from "../stores/pages.store";
import { observer } from "mobx-react-lite";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1vh 2vw;
  border-bottom: 4px solid white;
`;

const ControlButton = styled.button`
  background-color: transparent;
  padding: 0;
  padding-left: 0.6vw;
`;

const TextStyles = css`
  font-family: inherit;
  font-size: 1.2em;
  text-overflow: ellipsis;
`;

const PositionStyles = css`
  position: absolute;
  width: 10vw;
`;

const EditableTextWrapper = styled.div`
  position: relative;
`;

const EditableText = styled.span<{ $editing: boolean }>`
  ${PositionStyles}
  ${TextStyles}

  opacity: ${({ $editing }) => ($editing ? "0" : "1")};

  color: white;
  font-weight: 800;
`;

const TextEditor = styled.input.attrs({ type: "text" })<{ $editing: boolean }>`
  ${TextStyles}
  ${PositionStyles}  

  opacity: ${({ $editing }) => ($editing ? "1" : "0")};

  background-color: white;
  color: red;
  font-weight: 600;

  &:focus-visible {
    outline: none;
    border: 2px inset lightblue;
  }
`;

export const PageListing = observer(({ page }: { page: Page }) => {
  const [inFocus, setInFocus] = useState<boolean>(false);

  const handleRename = (newName: string) => {
    console.log("val", newName);
    pageStore.renamePage(page.id, newName);
  };

  return (
    <Wrapper>
      <EditableTextWrapper>
        <EditableText $editing={inFocus}>{page.name}</EditableText>
        <TextEditor
          type="text"
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
          onChange={(e) => handleRename(e.target.value)}
          $editing={inFocus}
        ></TextEditor>
      </EditableTextWrapper>
      <div style={{ marginLeft: "auto" }}>
        <ControlButton>rename</ControlButton>
        <ControlButton>remove</ControlButton>
      </div>
    </Wrapper>
  );
});
