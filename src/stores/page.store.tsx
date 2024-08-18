import { action, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { KImage, KObject, KText } from "../utils/types/konva-types";
import _ from "lodash";

export interface Page {
  id: string;
  title: string;
}

interface Layer {
  id: string;
  pageId: string;
  objects: (KImage | KText)[];
}

class PageStore {
  curPage: string | null; //id
  pages: Page[];
  layers: Record<string, Layer[]>; //pageId to layers

  constructor() {
    this.curPage = null;
    this.pages = [];
    this.layers = {};
    // this.pages.push({ id: "1", title: "Tokyo" });
    // this.pages.push({ id: "2", title: "Kyoto" });
    // const layer1 = this.addLayer(this.pages[0].id);
    // const layer2 = this.addLayer(this.pages[1].id);

    makeObservable(this, {
      curPage: observable,
      pages: observable,
      layers: observable,
      addPage: action,
      removePage: action,
      renamePage: action,
      addLayer: action,
      addObject: action,
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

  addLayer(pageId: string): string {
    const newLayer = { id: _.uniqueId(), pageId, objects: [] };
    if (this.layers[pageId] == null) {
      this.layers[pageId] = [newLayer];
    } else {
      const prev = this.layers[pageId];
      this.layers[pageId] = [...prev, newLayer];
    }
    return newLayer.id;
  }

  addObject(pageId: string, layerId: string, object: KObject) {
    // layer exist  exists?
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
