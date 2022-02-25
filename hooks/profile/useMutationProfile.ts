import { gql, useMutation, useQuery } from "@apollo/client";

export function useMutationProfile() {
  const [updateProfile, { loading, error, data }] = useMutation(PROFILE);

  return { loading, error, data, updateProfile };
}

const PROFILE = gql`
  mutation Profile($data: ProfileUpdateInput!) {
    updateProfile(data: $data) {
      full_name
      twitter
      facebook
      telegram
      discord
      phone
      avatar
      cover
    }
  }
`;
