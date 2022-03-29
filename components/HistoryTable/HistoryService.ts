import apoloClient, {
  setAuthToken as ApoloClient_setAuthToken,
} from "utils/apollo_client";

import { gql } from "@apollo/client";
import historyStore from "./HistoryStore";

export default class HistoryService {
  async fetchHistoryData(): Promise<any> {
    const res = await apoloClient.mutate({
      mutation: gql`
        query history($include: GBoxCampaignInclude) {
          boxCampaignBuyHistories(include: $include) {
            id
            box_campaign_uid
            quantity
            created_at
            updated_at
            status
            tx_hash
            box {
              cover_img
              name
              game {
                name
                logo
              }
            }
            box_price {
              price
              chain_symbol
              chain_icon
              chain_name
              currency_name
              boxType {
                name
                thumb_img
              }
            }
          }
        }
      `,
      variables: {
        include: {
          boxTypes: true,
          game: true,
        },
      },
    });

    const historyData = res.data;

    return historyData;
  }

  async getData() {
    try {
      const history = await this.fetchHistoryData();
      historyStore.setHistory(history);
    } catch (error) {
      console.log(error);
    }
  }
}
