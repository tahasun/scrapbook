import _ from "lodash";
import { action, computed, makeObservable, observable } from "mobx";
// import { makePersistable } from "mobx-persist-store";

class MediaStore {
  media: File[];

  constructor() {
    this.media = [];
    makeObservable(this, {
      media: observable,
      addMedia: action,
      images: computed,
    });

    // makePersistable(this, {
    //   name: "MediaStore",
    //   properties: ["media"],
    //   storage: window.localStorage,
    // });
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
}

export const mediaStore = new MediaStore();
