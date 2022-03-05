import { gql, useMutation } from "@apollo/client";

export function useMutaionVerifyEmail() {
  const [verifyEmail, { loading, error, data }] = useMutation(VERIFY_EMAIL);

  return { verifyEmail, error, loading, data: data };
}

const VERIFY_EMAIL = gql`
  mutation VerifyEmail($value: String!) {
    verifyEmail(email: $value) {
      email
    }
  }
`;
