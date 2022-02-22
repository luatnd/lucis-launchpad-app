import { gql, useQuery } from "@apollo/client";

export function useHome() {
  const { loading, error, data, refetch } = useQuery(SPLOTLIGHT_BOX_CAMPAIGN);

  return {
    loading,
    error,
    data,
  };
}

const SPLOTLIGHT_BOX_CAMPAIGN = gql`
  query spotlightBoxCampaign {
    spotlightBoxCampaign {
      uid
      cover_img
      desc
      start
      start
      end
      game {
        uid
        name
        logo
        trailer_video
      }
    }
  }
`;
