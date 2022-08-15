import { makeAutoObservable } from "mobx";

class CampaignStore {
  private _connectModalVisible: boolean = false


  constructor() {
    makeAutoObservable(this)
  }

  /* ============= Getter & Setter ==============*/
  get connectModalVisible(): boolean {
    return this._connectModalVisible;
  }

  set connectModalVisible(value: boolean) {
    this._connectModalVisible = value;
  }
}

const s = new CampaignStore();
export default s;