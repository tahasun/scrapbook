import { CSSProperties, Drawer, ModalBaseStylesNames } from "@mantine/core";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { pageStore } from "../stores/pages.store";
import _ from "lodash";
import { PageListing } from "./page-listing";

const BarStyles: Partial<Record<ModalBaseStylesNames, CSSProperties>> = {
  root: {
    position: "absolute",
    top: "10vh",
    left: "0vw",
    color: "black",
    zIndex: "99",
    height: "80vh",
    width: "26vw",
  },
  content: {
    borderRadius: "0vw 2vw 2vw 0vw",
    height: "100%",
    width: "100%",
    backgroundColor: "pink",
  },
  close: {
    backgroundColor: "transparent",
    color: "white",
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

const ControlWrapper = styled.div`
  padding: 0vh 0vw 2vw 2vw;
`;

const NavWrapper = styled.div``;

export const MediaBar = observer(
  ({ opened, close }: { opened: boolean; close: () => void }) => {
    const handleAddPage = () => {
      const id = _.uniqueId();
      pageStore.addPage({ id, title: "New Page" });
    };

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
        <ControlWrapper>
          <FolderSpecialIcon
            fontSize="large"
            style={{ color: "white" }}
            onClick={handleAddPage}
          />
        </ControlWrapper>
        <NavWrapper>
          {pageStore.pages.map((page) => (
            <PageListing key={page.id} page={page} />
          ))}
        </NavWrapper>
      </Drawer>
    );
  }
);
