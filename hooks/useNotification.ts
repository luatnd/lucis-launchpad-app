import { gql, useSubscription } from "@apollo/client";
import { notification } from "antd";

type Props = {
  user_id: number;
};

const useNotification = ({ user_id }: Props) => {
  const { data: notificationData } = useSubscription(PUSH_NOTIFICATION, {
    variables: { user_id },
  });
  //   console.log(user_id);

  //   console.log(notificationData);
  return { notificationData: notificationData?.content };
};

export default useNotification;

const PUSH_NOTIFICATION = gql`
  subscription ($user_id: Float!) {
    pushNotification(user_id: $user_id) {
      content
    }
  }
`;
