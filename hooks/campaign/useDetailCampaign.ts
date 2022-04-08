import { gql, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";

type Props = {
  box_campaign_uid: string;
  user_id: number | undefined;
};

export function useDetailCampaign({ box_campaign_uid, user_id }: Props) {
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
    refetch: refetchIsInWhiteList,
  } = useQuery(IS_IN_WHITE_LIST, {
    variables: { box_campaign_uid },
    fetchPolicy: "no-cache",
  });

  const {
    loading: loadingOfRegisteredWhitelist,
    error: errorOfRegisteredWhitelist,
    data: dataWhitelistRegistered,
  } = useQuery(WHITELIST_REGISTERED, {
    variables: { box_campaign_uid },
    fetchPolicy: "no-cache",
  });

  const {
    loading: loadingWhiteListRegistered,
    error: errorWhiteListRegistered,
    data: dataWhitelistRegisteredRecently,
  } = useSubscription(WHITELIST_REGISTERED_RECENTLY_SUB, {
    variables: { box_campaign_uid },
    fetchPolicy: "cache-only",
  });

  const {
    // error: errorPurchasedBox,
    data: purchasedBox,
  } = useSubscription(PURCHASED_BOX_SUBSCRIPTION, {
    variables: { box_campaign_uid },
  });

  const { data: historiesBox, refetch: refetchBoxHistory } = useQuery(
    BUY_BOX_HISTORIES,
    {
      variables: {
        include: {
          boxTypes: true,
          game: true,
        },
      },
      fetchPolicy: "no-cache",
    }
  );

  const { data: recentlyPurchasedBox } = useSubscription(
    PURCHASED_RECENTLY_BOX_SUBSCRIPTION,
    {
      variables: { box_campaign_uid, user_id },
    }
  );

  const {
    data: boxCampaignDetailSubcription,
    refetch: refetchBoxCampaignDetailSubcription,
  } = useQuery(BOX_CAMPAIGN_SUBSCRIPTION_DETAIL, {
    variables: {
      box_campaign_uid,
    },
  });

  return {
    loading,
    error,
    refetchBoxCampaignDetailSubcription,
    refetchBoxHistory,
    refetchIsInWhiteList,

    boxCampaign: data?.campaignDetail,
    isInWhitelist: dataIsInWhiteList?.isInWhitelist ?? false,
    whitelistRegistered: dataWhitelistRegistered?.whitelistRegistered,

    loadingOfRegisteredWhitelist,
    errorOfRegisteredWhitelist,
    whitelistRegisteredRecently:
      dataWhitelistRegisteredRecently?.whitelistRegisteredRecently,
    purchasedBox: purchasedBox?.purchasedBox,
    boxCampaignDetailSubcription:
      boxCampaignDetailSubcription?.boxCampaignSubscriptionDetail
        .enable_notify ?? false,

    recentlyPurchasedBox: recentlyPurchasedBox?.recentlyPurchasedBox,
    historiesBox: historiesBox?.boxCampaignBuyHistories.filter(
      (box: any) => box.box_campaign_uid === box_campaign_uid
    ),
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
        name
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
        website
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

const BUY_BOX_HISTORIES = gql`
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
`;

const PURCHASED_RECENTLY_BOX_SUBSCRIPTION = gql`
  subscription ($box_campaign_uid: String!, $user_id: Float!) {
    recentlyPurchasedBox(
      box_campaign_uid: $box_campaign_uid
      user_id: $user_id
    ) {
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
`;

const BOX_CAMPAIGN_SUBSCRIPTION_DETAIL = gql`
  query ($box_campaign_uid: String!) {
    boxCampaignSubscriptionDetail(box_campaign_uid: $box_campaign_uid) {
      enable_notify
    }
  }
`;
