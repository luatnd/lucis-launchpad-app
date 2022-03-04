import { gql, useQuery } from "@apollo/client";

export function useQueryBoxs() {
  const { loading, error, data: data } = useQuery(BOX_CAMPAIGN);

  return {
    loading,
    error,
    data: data,
  };
}

const BOX_CAMPAIGN = gql`
  query upcomingBoxCampain {
    spotlightBoxCampaign {
      uid
      game_uid
      desc
      cover_img
      start
      end
    }
    upcomingBoxCampaign {
      uid
      game_uid
      desc
      cover_img
      start
      end
    }
    openingBoxCampaign {
      uid
      game_uid
      desc
      cover_img
      start
      end
    }
    closedBoxCampaign {
      uid
      game_uid
      desc
      cover_img
      start
      end
    }
  }
`;

export function useQueryBoxHistories(includeValue: any) {
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
      status
      tx_hash
      box {
        name
        cover_img
      }
    }
  }
`;
