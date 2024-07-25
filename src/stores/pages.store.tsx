import { action, makeObservable, observable } from "mobx";

export interface Page {
  id: string;
  title: string;
}

class PageStore {
  curPage: string | null; //id
  pages: Page[];

  constructor() {
    this.curPage = null;
    this.pages = [];
    makeObservable(this, {
      curPage: observable,
      pages: observable,
      addPage: action,
      removePage: action,
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
}

export const pageStore = new PageStore();
