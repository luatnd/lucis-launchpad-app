import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";

type Props = {
  box_campaign_uid: string;
};

export function useDetailCampaign({ box_campaign_uid }: Props) {
  const { loading, error, data } = useQuery(DETAIL_CAMPAIGN, {
    variables: {
      box_campaign_uid,
    },
    fetchPolicy: "cache-and-network",
  });

  const {
    loading: loadingOpening,
    error: errorOpening,
    data: dataIsInWhiteList,
  } = useQuery(IS_IN_WHITE_LIST, { variables: { box_campaign_uid } });

  const {
    loading: loadingOfRegisteredWhitelist,
    error: errorOfRegisteredWhitelist,
    data: dataWhitelistRegistered,
  } = useQuery(WHITELIST_REGISTERED, { variables: { box_campaign_uid } });

  const {
    loading: loadingWhiteListRegistered,
    error: errorWhiteListRegistered,
    data: dataWhitelistRegisteredRecently,
  } = useSubscription(WHITELIST_REGISTERED_RECENTLY_SUB, {
    variables: { box_campaign_uid },
  });

  const {
    // error: errorPurchasedBox,
    data: purchasedBox,
  } = useSubscription(PURCHASED_BOX_SUBSCRIPTION, {
    variables: { box_campaign_uid },
  });

  return {
    loading,
    error,
    boxCampaign: data?.campaignDetail,
    isInWhitelist: dataIsInWhiteList?.isInWhitelist ?? false,
    whitelistRegistered: dataWhitelistRegistered?.whitelistRegistered,

    loadingOfRegisteredWhitelist,
    errorOfRegisteredWhitelist,
    whitelistRegisteredRecently:
      dataWhitelistRegisteredRecently?.whitelistRegisteredRecently,
    purchasedBox: purchasedBox?.purchasedBox,
  };
}

const DETAIL_CAMPAIGN = gql`
  query ($box_campaign_uid: String!) {
    campaignDetail(
      where: { uid: $box_campaign_uid }
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
      banner_img
      chains {
        symbol
      }
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
      game {
        name
        desc
        desc_team
        trailer_video
        facebook
        twitter
        telegram
        youtube
        discord
        logo
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
          currency {
            symbol
            icon
            chain_symbol
            address
          }
          contract_address
        }
      }
    }
  }
`;

const IS_IN_WHITE_LIST = gql`
  query ($box_campaign_uid: String!) {
    isInWhitelist(box_campaign_uid: $box_campaign_uid)
  }
`;

const WHITELIST_REGISTERED = gql`
  query ($box_campaign_uid: String!) {
    whitelistRegistered(box_campaign_uid: $box_campaign_uid) {
      registered
      limit
    }
  }
`;

const WHITELIST_REGISTERED_RECENTLY_SUB = gql`
  subscription ($box_campaign_uid: String!) {
    whitelistRegisteredRecently(box_campaign_uid: $box_campaign_uid) {
      registered
      limit
      box_campaign_uid
    }
  }
`;

const PURCHASED_BOX_SUBSCRIPTION = gql`
  subscription ($box_campaign_uid: String!) {
    purchasedBox(box_campaign_uid: $box_campaign_uid) {
      uid
      total_amount
      sold_amount
      box_campaign_uid
    }
  }
`;
