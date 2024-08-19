import _ from "lodash";
import { action, computed, makeObservable, observable } from "mobx";
import { getFiles, uploadFile } from "../awsService";
import { S3Client } from "@aws-sdk/client-s3";

class MediaStore {
  media: File[];

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
      images: computed,
    });
  }

  addMedia(files: File[]) {
    this.media.push(...files);
  }

  get images() {
    return this.media.map((file: File) => ({
      id: _.uniqueId(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));
  }

  async uploadFile(file: Blob) {
    try {
      this.isUploading = true;
      await uploadFile(file);
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
}

export const mediaStore = new MediaStore();
