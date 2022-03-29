import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";

type Props = {
  box_campaign_uid: string;
};

export function useEnableNotification() {
  const [enableNotification, { loading, error, data }] =
    useMutation(ENABLE_NOTIFICATION);

  return {
    enableNotification,
    loadingEnable: loading,
    errorEnable: error,
    dataEnable: data,
  };
}

const ENABLE_NOTIFICATION = gql`
  mutation EnableNotification($box_campaign_uid: String!) {
    enableNotification(BoxCampaignId: $box_campaign_uid)
  }
`;

export function useDisableNotification() {
  const [disableNotification, { loading, error, data }] = useMutation(
    DISEABLE_NOTIFICATION
  );

  return {
    disableNotification,
    loadingDisable: loading,
    errorDisable: error,
    dataDisbale: data,
  };
}

const DISEABLE_NOTIFICATION = gql`
  mutation DisableNotification($box_campaign_uid: String!) {
    disableNotification(BoxCampaignId: $box_campaign_uid)
  }
`;
