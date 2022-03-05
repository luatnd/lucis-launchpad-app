import { gql, useQuery } from "@apollo/client";

export function useQueryBoxs() {
  const { loading, error, data, refetch } = useQuery(BOX_CAMPAIGN);
  const { loading: loadingOpening, error: errorOpening, data: dataOpening } = useQuery(OPENING_BOX);

  return {
    loading,
    error,
    data: data,
    dataOpening,
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

const OPENING_BOX = gql`
  query {
    openingBoxCampaign{
      name
      desc
      cover_img
      status
      start
      game{
        uid
        name
        desc
        logo
        desc_team
        website
        whitepaper
        facebook
        twitter
        telegram
        youtube
      }
    }
  }
`