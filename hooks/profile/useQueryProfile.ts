import { gql, useMutation, useQuery } from "@apollo/client";

export function useQueryProfile() {
  const { loading, error, data } = useQuery(PROFILE);

  return { loading, error, data: data };
}

const PROFILE = gql`
  query {
    me {
      name
      id
      role
      code
      email
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
