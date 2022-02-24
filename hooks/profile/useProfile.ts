import { gql, useMutation, useQuery } from "@apollo/client";

export function useProfile() {
  const [updateFullName, { loading, error, data }] = useMutation(PROFILE);

  return { loading, error, data, updateFullName };
}

const PROFILE = gql`
  mutation Profile($data: ProfileUpdateInput!) {
    updateProfile(data: $data) {
      full_name
    }
  }
`;
