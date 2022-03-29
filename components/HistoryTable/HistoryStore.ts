import { makeAutoObservable } from "mobx";
import { GBoxCampaignBuyHistory } from "src/generated/graphql";

class HistoryStore {
  private _histories?: GBoxCampaignBuyHistory[];

  constructor() {
    makeAutoObservable(this);
  }

  addToHistoryList(box: any) {
    this._histories ? this._histories.push(box) : (this._histories = []);
  }

  setHistory(historyData: any) {
    this._histories = historyData;
  }

  get histories(): any {
    return this._histories;
  }
}

const historyStore = new HistoryStore();

export default historyStore;
