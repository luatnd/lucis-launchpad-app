import { ApolloError, ApolloQueryResult, gql, useQuery } from "@apollo/client";
import { UserGql } from "src/generated/graphql";

export function useQueryAffiliate(): {
  loading: boolean,
  errorDataAffiliate: ApolloError | undefined,
  refetchDataAffiliate: () => Promise<ApolloQueryResult<any>>;
  dataAffiliate: any[] | undefined
} {
  const { loading, error, data, refetch } = useQuery(GET_USER_REFER_FRIEND, {
    variables: {},
    fetchPolicy: "network-only",
  });

  return {
    loading,
    errorDataAffiliate: error,
    refetchDataAffiliate: refetch,
    dataAffiliate: data?.getUserReferFriend,
  };
}

const GET_USER_REFER_FRIEND = gql`
  query {
    getUserReferFriend {
      id
      address
      code
      box_campaigns{
        uid
        name
        affiliate_status
        paid {
          amount
          currency
          commission
        }
      }
    }
  }
`;