import { gql, useQuery } from "@apollo/client";

export function useCloseCampaign() {
  const { loading, error, data: resultCloseCampaign, refetch } = useQuery(GET_UPCOMING);

  return {
    loading,
    error,
    resultCloseCampaign,
  };
}

const GET_UPCOMING = gql`
  query {
    closedBoxCampaign {
      uid
      cover_img
      start
      end
      name
      highlight
      game {
        uid
        name
        desc
        logo
        website
        facebook
        twitter
        telegram
        youtube
        discord
      }
      chains{
        icon
      }
    }
  }
`;
