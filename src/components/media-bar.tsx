import { CSSProperties, Drawer, ModalBaseStylesNames } from "@mantine/core";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const BarStyles: Partial<Record<ModalBaseStylesNames, CSSProperties>> = {
  root: {
    position: "absolute",
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
    color: "lightblue",
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

export const MediaBar = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  return (
    <Drawer
      closeOnClickOutside={true}
      closeOnEscape={true}
      radius="md"
      opened={opened}
      onClose={close}
      styles={BarStyles}
      transitionProps={{ duration: 400, transition: "slide-right" }}
      closeButtonProps={{
        icon: <KeyboardDoubleArrowLeftIcon fontSize="large" />,
      }}
    >
      Hello Kitty
    </Drawer>
  );
};
