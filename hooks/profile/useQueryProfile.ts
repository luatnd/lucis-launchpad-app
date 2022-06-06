import { gql, useQuery } from "@apollo/client";

export function useQueryProfile() {
  const { loading, error, data, refetch } = useQuery(PROFILE);

  return { loading, error, data: data, refetch };
}

const PROFILE = gql`
  query {
    me {
      name
      id
      role
      code
      email
      address
      profile {
        full_name
        twitter
        facebook
        discord
        telegram
        phone
        avatar
      }
    }
  }
`;
