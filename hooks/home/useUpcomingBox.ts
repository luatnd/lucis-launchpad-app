import { gql, useQuery } from "@apollo/client";

export function useBook() {
  const { loading, error, data, refetch } = useQuery(BOX_CAMPAIGN);

  return {
    loading,
    error,
    data,
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
