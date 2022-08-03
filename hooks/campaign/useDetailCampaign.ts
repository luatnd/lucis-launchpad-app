import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect } from "react";

type Props = {
  box_campaign_uid: string;
  user_id?: number | undefined;
  skip?: boolean;
};

export function useDetailCampaign({ box_campaign_uid, user_id, skip }: Props) {
  const [newBoxCampaignRef] = useMutation(NEW_BOX_CAMPAIGN_REF);
  const [presale] = useMutation(PRESALE);

  const { loading, error, data } = useQuery(DETAIL_CAMPAIGN, {
    variables: {
      box_campaign_uid,
    },
    fetchPolicy: "cache-and-network",
    skip: skip,
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
    fetchPolicy: "no-cache",
  });

  return {
    loading,
    error,
    refetchBoxCampaignDetailSubcription,
    refetchBoxHistory,
    refetchIsInWhiteList,
    newBoxCampaignRef,
    presale,
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
        ?.enable_notify ?? false,

    recentlyPurchasedBox: recentlyPurchasedBox?.recentlyPurchasedBox,
    historiesBox: historiesBox?.boxCampaignBuyHistories.filter(
      (box: any) => box.box_campaign_uid === box_campaign_uid
    ),
  };
}

export function usePresaleRemaining(props: Props) {
  const {
    loading,
    error,
    data: dataPresaleRemaining,
    refetch: refetchPresaleRemaining,
  } = useQuery(PRESALE_REMAINING, {
    variables: { box_campaign_uid: props?.box_campaign_uid },
    fetchPolicy: "no-cache",
    onError: (error) => {
      console.log("error: ", error);
    },
    skip: props?.skip,
  });

  return {
    loading,
    error,
    dataPresaleRemaining: dataPresaleRemaining?.presaleRemaining,
    refetchPresaleRemaining,
  };
}

export function useGetBoxPresale(props: Props) {
  const {
    loading,
    error,
    data,
    refetch,
  } = useQuery(GET_BOX_PRESALE, {
    variables: { box_campaign_uid: props?.box_campaign_uid },
    fetchPolicy: "no-cache",
    onError: (error) => {
      console.log("error: ", error);
    },
    skip: props?.skip,
  });

  return {
    loading,
    error,
    dataGetBoxPresale: data?.getBoxPresale,
    refetchDataGetBoxPresale: refetch,
  };
}

export function useGetConfig() {
  const {
    loading,
    error,
    data: dataConfig,
  } = useQuery(GET_CONFIG, {
    //variables: {},
    fetchPolicy: "no-cache",
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  return {
    loading,
    error,
    dataConfig: dataConfig?.getConfig,
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
        presale_price
        require_presale
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
      currencies {
        address
        uid
        chain_symbol
        symbol
        name
        chain {
          symbol
          name
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

const PRESALE_REMAINING = gql`
  query ($box_campaign_uid: String!) {
    presaleRemaining(box_campaign_uid: $box_campaign_uid) {
      presaled
      remain
    }
  }
`;

const GET_BOX_PRESALE = gql`
  query ($box_campaign_uid: String!) {
    getBoxPresale(box_campaign_uid: $box_campaign_uid) {
      total_quantity
    }
  }
`;

const GET_CONFIG = gql`
  query{
    getConfig{
      id
      presale_wallet
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
        currency_symbol
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
        currency_symbol
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

const NEW_BOX_CAMPAIGN_REF = gql`
  mutation ($box_campaign_uid: String!, $ref: String!) {
    newBoxCampaignRef(box_campaign_uid: $box_campaign_uid, ref: $ref)
  }
`;

const PRESALE = gql`
  mutation (
    $box_campaign_uid: String!,
    $quantity: Int!,
    $tx_hash: String!,
    $address: String!,
    $currency_uid: String!
  ) {
    presale(
      box_campaign_uid: $box_campaign_uid,
      quantity: $quantity,
      tx_hash: $tx_hash,
      address: $address,
      currency_uid: $currency_uid
    )
  }
`;
