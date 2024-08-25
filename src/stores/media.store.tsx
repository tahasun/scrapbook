import _ from "lodash";
import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import { getFiles, uploadFile, downloadFile } from "../awsService";
import { S3Client } from "@aws-sdk/client-s3";
import { uint8ArrayToBase64 } from "../utils/types/transformers";

// TODO: thumbnails for preview
// need to resize thumbnails and store it in local storage
// needs to be accessed quite frequently
export interface Image {
  id: string;
  key: string;
  url: string;
}

interface Media {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: File;
}

class MediaStore {
  media: Record<string, Image>;
  mediaKeys: Set<string>;

  client: S3Client;
  isClientCreated = false;
  isUploading = false;
  uploadProgress = 0;
  error = null;

  constructor() {
    this.media = {};
    this.mediaKeys = new Set();

    makeObservable(this, {
      media: observable,
      mediaKeys: observable,
      addMedia: action,
      addKey: action,
      retrieveFiles: action.bound,
      downloadImg: action.bound,
    });
  }

  addMedia(img: Image) {
    if (this.media[img.id] == null) {
      console.log(img.key);
      this.media[img.id] = img;
    }
  }

  addKey(key: string) {
    this.mediaKeys.add(key);
  }

  async uploadFile(key: string, file: Blob) {
    try {
      this.isUploading = true;
      await uploadFile(key, file);
    } catch (error) {
      this.error = error;
    } finally {
      this.isUploading = false;
    }
  }

  async retrieveFiles(): Promise<boolean> {
    try {
      const files = await getFiles().then((collection) => {
        collection?.Contents?.forEach((img) => {
          if (img.Key != null) {
            const [dir, file] = img.Key?.split("/");
            if (file != null && file != "" && dir == "images") {
              this.addKey(img.Key);
            }
          }
        });
        return collection;
      });
      return true;
    } catch (error) {
      console.log("err", error);
      this.error = error;
      return false;
    }
  }

  // we want to download a small portion at a time instead of the entire collection
  async downloadImg(key: string | undefined): Promise<boolean> {
    if (key == null) {
      return false;
    }

    try {
      const data = await downloadFile(key);
      const uint8Arr = await data.Body?.transformToByteArray();

      const base64String = uint8ArrayToBase64(uint8Arr);
      const src = `data:image/png;base64,${base64String}`;

      this.addMedia({ key: key, id: key, url: src });

      return true;
    } catch (error) {
      console.log("err", error);
      this.error = error;
      return false;
    }
  }
}

export const mediaStore = new MediaStore();
