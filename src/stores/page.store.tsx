import { action, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { KObject } from "../utils/types/konva-types";
import _ from "lodash";

export interface Page {
  id: string;
  title: string;
}

interface Layer {
  id: string;
  pageId: string;
  objects: KObject[];
}

class PageStore {
  curPage: string | null; //id
  pages: Page[];
  layers: Record<string, Layer[]>; //pageId to layers

  constructor() {
    this.curPage = null;
    this.pages = [];
    this.layers = {};

    makeObservable(this, {
      curPage: observable,
      pages: observable,
      layers: observable,
      addPage: action,
      removePage: action,
    });

    makePersistable(this, {
      name: "PageStore",
      properties: ["curPage", "pages", "layers"],
      storage: window.localStorage,
    });

    (window as any).pageStore = this;
  }

  addPage(item: Page) {
    this.pages.push(item);
  }

  removePage(id: string) {
    this.pages = this.pages.filter((item) => item.id != id);
  }

  renamePage(id: string, newName: string) {
    const newPage = { id: id, title: newName };
    this.pages = this.pages.map((p) => (p.id == id ? newPage : p));
  }

  get currentLayer() {
    if (this.curPage != null) {
      return this.layers[this.curPage];
    }
  }

  addObject(pageId: string, layerId: string, object: KObject) {
    // page exists?
    if (this.layers[pageId] == null) {
      throw new Error(`page ${pageId} does not exist`);
    }

    const layerToAdd = this.layers[pageId].find((layer) => layer.id == layerId);

    if (layerToAdd == null) {
      const newLayer: Layer = { id: _.uniqueId(), pageId, objects: [] };
      newLayer.objects.push(object);
    } else {
      layerToAdd.objects.push(object);
    }
  }
}

export const pageStore = new PageStore();
