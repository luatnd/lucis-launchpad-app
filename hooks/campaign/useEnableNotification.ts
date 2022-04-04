import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";

type Props = {
  box_campaign_uid: string;
};

export default function useNotification() {
  const [
    enableNotification,
    { loading: loadingEnable, error: errorEnable, data },
  ] = useMutation(ENABLE_NOTIFICATION);

  const [
    disableNotification,
    { loading: loadingDisable, error: errorDisable },
  ] = useMutation(DISEABLE_NOTIFICATION);

  return {
    enableNotification,
    disableNotification,
    loadingEnable,
    errorEnable,
    loadingDisable,
    errorDisable,
    dataEnable: data,
  };
}

// export function useDisableNotification() {
//   const [disableNotification, { loading, error, data }] = useMutation(
//     DISEABLE_NOTIFICATION
//   );

//   return {
//     disableNotification,
//     loadingDisable: loading,
//     errorDisable: error,
//     dataDisbale: data,
//   };
// }

const ENABLE_NOTIFICATION = gql`
  mutation EnableNotification($box_campaign_uid: String!) {
    enableNotification(box_campaign_id: $box_campaign_uid)
  }
`;

const DISEABLE_NOTIFICATION = gql`
  mutation DisableNotification($box_campaign_uid: String!) {
    disableNotification(box_campaign_id: $box_campaign_uid)
  }
`;
