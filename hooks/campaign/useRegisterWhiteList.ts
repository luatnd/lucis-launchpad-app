import { gql, useMutation } from "@apollo/client";

export function useMutationRegisterWhiteList() {
    const [registerWhitelist, { loading, error, data }] = useMutation(REGISTER_WHITE_LIST);

    return { loading, error, data, registerWhitelist };
}

const REGISTER_WHITE_LIST = gql`
  mutation RegisterWhiteList($box_campaign_uid: String!) {
    registerWhitelist(box_campaign_uid: $box_campaign_uid)
  }
`;
