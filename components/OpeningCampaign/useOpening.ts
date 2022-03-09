import { gql, useQuery } from "@apollo/client";

export function useOpening() {
  const { loading, error, data: resultOpening, refetch } = useQuery(GET_OPENING);

  return {
    loading,
    error,
    resultOpening,
  };
}

const GET_OPENING = gql`
  query {
    openingBoxCampaign {
      uid
      game_uid
      name
      cover_img
      opening_at
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
      boxTypes {
        sold_amount
        total_amount
      }
    }
  }
`;
