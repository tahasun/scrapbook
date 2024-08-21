import _ from "lodash";
import { action, computed, makeObservable, observable } from "mobx";
import { getFiles, uploadFile, downloadFile } from "../awsService";
import { S3Client } from "@aws-sdk/client-s3";
import { uint8ArrayToBase64 } from "../utils/types/transformers";
import { Image } from "../components/media-uploader";
// thumbnails
// need to resize thumbnails and store it in local storage
// needs to be accessed quite frequently

class MediaStore {
  media: Image[];

  client: S3Client;
  isClientCreated = false;
  isUploading = false;
  uploadProgress = 0;
  error = null;

  constructor() {
    this.media = [];

    makeObservable(this, {
      media: observable,
      addMedia: action,
      // images: computed,
    });
  }

  addMedia(file: Image) {
    this.media.push(file);
  }

  // get images() {
  //   return this.media.map((file: File) => ({
  //     id: _.uniqueId(),
  //     name: file.name,
  //     url: URL.createObjectURL(file),
  //   }));
  // }

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

  async retrieveFiles() {
    try {
      const files = await getFiles();
      return files;
    } catch (error) {
      console.log("err", error);
      this.error = error;
    }
  }

  async downloadImg(key: string | undefined): Promise<boolean> {
    if (key == null) {
      return false;
    }

    try {
      const data = await downloadFile(key);
      const uint8Arr = await data.Body?.transformToByteArray();

      const base64String = uint8ArrayToBase64(uint8Arr);
      const src = `data:image/png;base64,${base64String}`;
      const n = key.split("/")[1];

      this.addMedia({ name: n, id: "", url: src });

      return true;
    } catch (error) {
      console.log("err", error);
      this.error = error;
      return false;
    }
  }
}

export const mediaStore = new MediaStore();
