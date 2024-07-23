import { Drawer, ModalBaseStylesNames } from "@mantine/core";
import styled, { CSSProperties } from "styled-components";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const Wrapper = styled.div``;

const BarStyles: Partial<Record<ModalBaseStylesNames, CSSProperties>> = {
  root: {
    position: "absolute",
    // border: "2px solid lightblue",

    top: "10vh",
    left: "0vw",
    color: "black",
    zIndex: "99",
    height: "80vh",
    width: "30vw",
  },
  content: {
    border: "2px solid lightblue",
    backgroundColor: "white",
    borderRadius: "0vw 2vw 2vw 0vw",
    height: "100%",
    width: "100%",
  },
  close: {
    backgroundColor: "transparent",
    color: "red",
    marginLeft: "auto",
  },
  inner: {
    height: "100%",
    width: "100%",
  },
  overlay: {},
  body: {},
  header: { display: "flex" },
};

const CloseButton = styled(KeyboardDoubleArrowLeftIcon)`
  margin-left: auto;
  color: black;

  &:focus {
    outline: none;
  }
`;

export const MediaBar = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  console.log(opened);
  return (
    <Wrapper>
      <Drawer
        closeOnClickOutside={true}
        closeOnEscape={true}
        // offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        styles={BarStyles}
        closeButtonProps={{
          icon: <CloseButton fontSize="large" />,
        }}
      >
        Hello Kitty
      </Drawer>
    </Wrapper>
  );
};
