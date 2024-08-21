import FileUploadIcon from "@mui/icons-material/FileUpload";
import styled from "styled-components";
import { Tile, TileGrid } from "./media-preview-tile";
import { useCallback, useMemo } from "react";
import { FileInput } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { mediaStore } from "../stores/media.store";
import _ from "lodash";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const Wrapper = styled.div`
  height: 18vh;
  padding: 4vh var(--left-offset) 2vh var(--left-offset);
`;

const UploadZone = styled.div`
  background-color: var(--light-tint);
  border-radius: 0.5em;
  height: 100%;
  color: var(--dark-tint);
  padding: 1vw;
`;

const Decorator = styled.div`
  border: 2px dotted var(--dark-tint);
  height: 100%;
  border-radius: 0.5em;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &input::file-selector-button {
    display: block;
  }
`;

const FileInputStyles = {
  input: {
    fontSize: "0.5em",
    fontWeight: "800",
    maxWidth: "18vw",
    backgroundColor: "var(--dark-tint)",
  },
};

export interface Image {
  id: string;
  name: string;
  url: string;
}

interface Media {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: File;
}

export const MediaUploader = observer(() => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const items = Array.from(e.dataTransfer.files);
    uploadMedia(items);
  };

  const uploadMedia = useCallback(
    (files: File[]) => {
      mediaStore.uploadFile(files[0].name, files[0]);
    },
    [mediaStore]
  );

  const handleUpload = (files: File[]) => {
    uploadMedia(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const { data: fileList, error } = useQuery({
    queryKey: ["s3Bucket"],
    queryFn: mediaStore.retrieveFiles,
  });

  console.log("s3 list", fileList, error);

  const { data } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      // const imgs = [];
      // fileList?.Contents?.forEach(async (f) => {
      //   const img = await mediaStore.downloadImg(f.Key);
      //   if(img != null){
      //     imgs.push(img);
      //   }
      // });
      console.log("downloding...");
      return await mediaStore.downloadImg(fileList?.Contents?.[1].Key);
    },
  });

  console.log(data, JSON.parse(JSON.stringify(mediaStore.media)));
  const images = mediaStore.media;

  return (
    <>
      <Wrapper>
        <UploadZone
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
        >
          <Decorator>
            <FileUploadIcon fontSize="large" />
            <FileInput
              styles={FileInputStyles}
              size="xs"
              variant="unstyled"
              accept="image/png, image/jpeg, video/*"
              onChange={(files) => handleUpload(files)}
              multiple
              placeholder="Upload Media"
            />
          </Decorator>
        </UploadZone>
      </Wrapper>
      <TileGrid>
        {images.map((img) => (
          <Tile img={img} key={img.id} />
        ))}
      </TileGrid>
    </>
  );
});
