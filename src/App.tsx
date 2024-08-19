import { MantineProvider } from "@mantine/core";
import "./App.css";
import { Canvas } from "./components/canvas";
import { MediaBar } from "./components/media-bar";
import { useDisclosure } from "@mantine/hooks";
import { styled } from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { mediaStore } from "./stores/media.store";

const MenuButton = styled.button<{ $hide: boolean }>`
  position: absolute;
  z-index: 100;
  top: 10vh;
  left: 2vw;
  color: pink;
  background-color: transparent;
  padding: 0;
  opacity: ${({ $hide }) => ($hide ? "0" : "1")};

  &:focus,
  &:hover,
  &:focus-visible {
    outline: none;
    border-color: transparent;
  }
`;

const queryClient = new QueryClient();

function App() {
  const [opened, { open, close }] = useDisclosure(false);

  // useEffect(() => {
  //   mediaStore.initializeS3client();
  // });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <>
          <Canvas />
          <MenuButton onClick={open} $hide={opened}>
            <MenuIcon fontSize="large" />
          </MenuButton>
          <MediaBar opened={opened} close={close} />
        </>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
