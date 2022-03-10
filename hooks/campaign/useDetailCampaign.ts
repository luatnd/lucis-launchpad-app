import { gql, useQuery } from "@apollo/client";

export function useDetailCampaign({ box_campaign_uid }: any) {
  const { loading, error, data } = useQuery(DETAIL_CAMPAIGN);

  const {
    loading: loadingOpening,
    error: errorOpening,
    data: dataIsInWhiteList,
  } = useQuery(IS_IN_WHITE_LIST);

  const {
    loading: loadingWhiteListRegistered,
    error: errorWhiteListRegistered,
    data: dataWhiteListRegistered,
  } = useQuery(WHITE_LIST_REGISTERED, { variables: { box_campaign_uid } })

  return {
    loading,
    error,
    boxCampaign: data?.campaignDetail,
    isInWhitelist: dataIsInWhiteList?.isInWhitelist ?? false,
    dataWhiteListRegistered
  };
}

const DETAIL_CAMPAIGN = gql`
  query {
    campaignDetail(
      where: { uid: "cl02lx5or0000doo018d7n2zz" }
      include: {
        game: true
        boxTypes: true
        boxPrices: true
        chain: true
        currency: true
      }
    ) {
      uid
      game_uid
      name
      desc
      rules
      cover_img
      rounds {
        id
        name
        description
        is_whitelist
        require_whitelist
        participant_limit
        start
        end
      }
      status
      start
      end
      boxTypes {
        uid
        name
        thumb_img
        desc
        series_content
        total_amount
        sold_amount
        limit_per_user
        prices {
          uid
          price
          chain_symbol
          currency {
            symbol
            icon
          }
        }
      }
    }
  }
`;

const IS_IN_WHITE_LIST = gql(`
    query { 
        isInWhitelist(box_campaign_uid: "cl02lx5or0000doo018d7n2zz") 
    }
`);

const WHITE_LIST_REGISTERED = gql(`
  query getRegisteredWhiteList($box_campaign_uid: String!){
    registeredWhitelist(box_campaign_uid: $box_campaign_uid){
      registered
      limit
    }
  }
`)
