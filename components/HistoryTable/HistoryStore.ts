import { makeAutoObservable } from "mobx";

class HistoryStore {
  constructor() {
    makeAutoObservable(this);
  }
}

const historyStore = new HistoryStore();

export default historyStore;
