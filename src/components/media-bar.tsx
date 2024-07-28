import { CSSProperties, Drawer, ModalBaseStylesNames } from "@mantine/core";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { pageStore } from "../stores/pages.store";
import _ from "lodash";
import { PageListing, TextStyles } from "./page-listing";
import { MediaUploader } from "./media-uploader";
import { Tabs, rem } from "@mantine/core";
import PermMediaIcon from "@mui/icons-material/PermMedia";

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

const Divider = styled.div`
  padding: 0vh 0vw 2vw 2vw;
  border-bottom: 4px solid white;
`;

const NavWrapper = styled.div``;

const AddPageButton = styled.div`
  padding: 1vh 2vw;
  color: white;
  border-bottom: 4px solid white;
  ${TextStyles}
`;

const TabStyles = {
  tab: {
    backgroundColor: "transparent",
  },
};

enum CONTROLS {
  EXPLORE = "explore",
  GALLERY = "gallery",
}

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
        <Tabs defaultValue={CONTROLS.EXPLORE} styles={TabStyles}>
          <Tabs.List>
            <Tabs.Tab value={CONTROLS.EXPLORE}>
              <FolderSpecialIcon fontSize="large" style={{ color: "white" }} />
            </Tabs.Tab>
            <Tabs.Tab value={CONTROLS.GALLERY}>
              <PermMediaIcon fontSize="large" style={{ color: "white" }} />
            </Tabs.Tab>
          </Tabs.List>

          <Divider />

          <Tabs.Panel value={CONTROLS.EXPLORE}>
            <AddPageButton onClick={handleAddPage}>Add Page +</AddPageButton>
            <NavWrapper>
              {pageStore.pages.map((page) => (
                <PageListing key={page.id} page={page} />
              ))}
            </NavWrapper>
          </Tabs.Panel>

          <Tabs.Panel value={CONTROLS.GALLERY}>
            <MediaUploader />
          </Tabs.Panel>
        </Tabs>
      </Drawer>
    );
  }
);
