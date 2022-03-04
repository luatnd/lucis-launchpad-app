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
    query{
        upcomingBoxCampaign{
        uid
        game_uid
        status
        game{
        uid
        name
        logo
        website
        whitepaper
        pitchdeck
        facebook
        twitter
        telegram
        youtube
        }
    }
}
`;
