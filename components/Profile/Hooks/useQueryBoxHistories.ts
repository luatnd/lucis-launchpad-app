import { gql, useQuery } from "@apollo/client";

export function useQueryBoxHistories(includeValue: any) {
  // console.log(includeValue);
  const { loading, error, data: data } = useQuery(BOX_HISTORIES, { variables: includeValue });

  return {
    loading,
    error,
    data: data,
  };
}

const BOX_HISTORIES = gql`
  query historyBox($include: GBoxCampaignInclude) {
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
        }
      }
    }
  }
`;
