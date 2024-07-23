import { action, makeObservable, observable } from "mobx";

export interface Page {
  id: string;
  name: string;
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
  }

  addPage(item: Page) {
    this.pages.push(item);
  }

  removePage(id: string) {
    this.pages = this.pages.filter((item) => item.id != id);
  }

  renamePage(id: string, newName: string): boolean {
    const pageToRename = this.pages.find((page) => (page.id = id));
    if (pageToRename == null) {
      return false;
    }
    pageToRename.name = newName;
    return true;
  }
}

export const pageStore = new PageStore();
