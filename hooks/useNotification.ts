import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { notification } from "antd";

type Props = {
  user_id: number | undefined;
};

const useNotification = ({ user_id }: Props) => {
  const { data: notificationData } = useSubscription(PUSH_NOTIFICATION, {
    variables: { user_id },
    fetchPolicy: "no-cache",
  });

  const [getNotification, { data: getNotificationData }] = useMutation(
    GET_NOTIFICATION
    // { fetchPolicy: "no-cache" }
  );

  const { data: countUnreadNotifications } = useQuery(
    COUNT_UNREAD_NOTIFICATIONS
  );

  return {
    notificationSubscription: notificationData?.pushNotification,
    countUnreadNotifications:
      countUnreadNotifications?.countUnreadNotifications,
    getNotification,
    getNotificationData: getNotificationData?.getNotifications,
  };
};

export default useNotification;

const PUSH_NOTIFICATION = gql`
  subscription ($user_id: Float!) {
    pushNotification(user_id: $user_id) {
      content
    }
  }
`;

const GET_NOTIFICATION = gql`
  mutation {
    getNotifications {
      notification
      created_at
      box {
        cover_img
        desc
      }
    }
  }
`;

const COUNT_UNREAD_NOTIFICATIONS = gql`
  query {
    countUnreadNotifications
  }
`;
