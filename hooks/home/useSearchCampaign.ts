import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useState } from "react";

export function useSearchCampaign() {
  const client = useApolloClient();
  const [result, setResult] = useState<any>();

  const search = function (value: string) {
    return async function () {
      const _result = await client.query({
        query: SEARCH_BOX_CAMPAIGN,
        variables: { search: value },
      });
      setResult(_result);
    };
  };

  return { search, result };
}

const SEARCH_BOX_CAMPAIGN = gql`
  query ($search: String!) {
    searchCampaign(search: $search) {
      uid
      name
      cover_img
      game {
        name
      }
    }
  }
`;
