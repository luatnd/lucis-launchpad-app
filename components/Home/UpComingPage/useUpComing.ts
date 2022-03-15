import { gql, useQuery } from "@apollo/client";

export function useUpComing() {
  const { loading, error, data: resultUpComing, refetch } = useQuery(GET_UPCOMING);

  return {
    loading,
    error,
    resultUpComing,
  };
}

const GET_UPCOMING = gql`
  query {
    upcomingBoxCampaign {
      uid
      cover_img
      start
      end
      opening_at
      name
      highlight
      rounds {
        id
        start
        end
      }
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
    }
  }
`;
