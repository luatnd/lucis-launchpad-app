import {gql, ServerError, ServerParseError, useMutation} from "@apollo/client";
import {message, notification} from "antd";
import { useInput } from "hooks/common/use_input";
import { useMemo, useState } from "react";
import {
  ChainSymbol,
  GBoxCampaignRound,
  GBoxPrice,
  GBoxType,
} from "src/generated/graphql";
import apoloClient, {handleApolloError, onApolloError} from "utils/apollo_client";

import EthersService from "services/blockchain/Ethers";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "components/Auth/ConnectWalletStore";
import {ChainNetwork} from "../../utils/blockchain/BlockChain";
import {GraphQLError} from "graphql";
import {AppEmitter} from "../../services/emitter";
import {AuthUser} from "../../components/Auth/AuthStore";
import {trim_middle} from "../../utils/String";


export enum BuyDisabledReason {
  WalletNotConnected,
  SoldOut,
  WhitelistNotRegistered,
  NotSaleRound,
}

export function useBuyBox(
  boxType: GBoxType,
  round: GBoxCampaignRound | undefined,
  isInWhitelist: boolean | undefined,
  connectedChainNetwork: ChainNetwork | undefined,
  isLoggedIn: boolean,
) {
  // Lib Bug: loading is always true after mutate with error, so plz use promise approach instead
  // const [buyBox, { data, loading, error }] = useMutation(BUY_BOX_MUT);

  const [loading, setLoading] = useState(false);

  const chainSymbol = connectedChainNetwork;


  // get first matched box on connected chain (if connected)
  let boxPrice: GBoxPrice | undefined =
    (boxType.prices?.length ?? 0) > 0
      ? boxType.prices!.find(
          (item) => item.currency.chain_symbol?.toLowerCase() == chainSymbol
        )
      : undefined;
  // else if no chain was connected, select first box
  if (!boxPrice) {
    if (boxType.prices?.length) {
      boxPrice = boxType.prices[0]
    }
  }



  const requireWhitelist = round?.is_whitelist === false && round?.require_whitelist === true;


  // can buy box: in buy round + enough box to buy + registered whitelist if need + box left
  // @ts-ignore
  const isSaleRound = !round?.is_whitelist && !round?.is_abstract_round;

  let buyBtnDisabledReason: BuyDisabledReason | undefined = undefined;
  // const buyFormEnabled = isSaleRound
  //   && boxType.total_amount > boxType.sold_amount
  //   && (requireWhitelist ? isInWhitelist : true)
  // ;
  let buyFormEnabled = true;
  // if (!connectedChainNetwork) {
    /**
     * If wallet was not connect => Allow click buy but show modal to connect wallet
     */
    // buyFormEnabled = false
    // buyBtnDisabledReason = BuyDisabledReason.WalletNotConnected
  // } else
  if (!isSaleRound) {
    buyFormEnabled = false
    buyBtnDisabledReason = BuyDisabledReason.NotSaleRound
  }
  else if (!(boxType.sold_amount < boxType.total_amount)) {
    buyFormEnabled = false
    buyBtnDisabledReason = BuyDisabledReason.SoldOut
  } else if (!(requireWhitelist ? isInWhitelist : true)) {
    buyFormEnabled = false
    buyBtnDisabledReason = BuyDisabledReason.WhitelistNotRegistered
  }

  //  TODO: Check allowance and get approval for the contract


  const txtAmount = useInput("");
  const [err, setErr] = useState<string | undefined>();


  const onBuyBoxError = (e: GraphQLError) => {
    // show message and handle
    console.log('{onBuyBoxError} e: ', e);
    const {message: msg} = e;
    if (msg === "Allowance not enough") {
      message.error(msg, 6)
      // TODO: call approval again
      alert("connect metamask to get approval")
    } else {
      message.error(msg, 6)
      // AppEmitter.emit('showConnectWalletModal')
    }
  };

  const onAuthError = (e: GraphQLError) => {
    // show connect wallet modal and message
    console.log('{onAuthError} e: ', e);
    message.error('Error: Unauthorized: Please connect and verify your wallet first!', 6)
    AppEmitter.emit('showConnectWalletModal')
  }

  const onBuyBox = function () {
    if (!isLoggedIn) {
      setErr("Failed - You've not complete the verification!");
      return;
    }

    if (!boxPrice) {
      setErr("Box price not found!");
      return;
    }
    if (!round) {
      setErr("Round not found!");
      return;
    }
    if (round.require_whitelist === true && !isInWhitelist) {
      message.error(
        '<span>This box is for whitelisted user only</span>',
        3,
      );
      return;
    }

    const quantity = parseFloat(txtAmount.value ?? "0");
    if (!txtAmount.value || quantity <= 0) {
      txtAmount.setErr("Quantity must be greater than 0");
      return;
    }

    const maxPerUser = boxType.limit_per_user ?? 100; // default is 100 per user
    if (quantity > maxPerUser) {
      txtAmount.setErr(`A user can buy up to ${maxPerUser} boxes only`);
      return;
    }

    // console.log("round: ", round);
    setErr(undefined);

    console.log('==> {onBuyBox} input: ', {
      box_price_uid: boxPrice?.uid,
      round_id: round?.id ?? 0,
      quantity: quantity,
    });

    setLoading(true);
    buyBox(boxPrice?.uid, round?.id ?? 0, quantity)
      .then(res => {
        console.log('{onBuyBox.res} res: ', res);
      })
      .catch((err) => {
        onApolloError(
          err,
          onBuyBoxError,
          onAuthError,
          (e: Error | ServerParseError | ServerError) => {
            console.error('{onBuyBox.onNetworkError} e: ', e);
          },
        )
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onApprove = async function () {
    if (!ConnectWalletStore_NonReactiveData.web3Provider || !isLoggedIn) {
      notification["warn"]({
        message: "Please connect wallet and verify your address!",
      });
      return;
    }

    const ethersService = new EthersService(
      ConnectWalletStore_NonReactiveData.web3Provider
    );

    //Todo: get contract address from box price
    const contract_addr = "";
    const currency_addr = ""; // address of token to buy
    return ethersService.requestApproval(contract_addr, currency_addr);
  };

  return {
    loading,
    isSaleRound,
    buyFormEnabled,
    buyBtnDisabledReason,
    err,
    txtAmount,
    onBuyBox,
    requireWhitelist,
    boxPrice,
  };
}

const BUY_BOX_MUT = gql`
  mutation buyBox($input: BuyBoxInput!) {
    buyBox(input: $input)
  }
`;


async function buyBox(
  box_price_uid: string,
  round_id: number,
  quantity: number,
): Promise<any> {
  const res = await apoloClient.mutate({
    mutation: gql`
      mutation buyBox($input: BuyBoxInput!) {
        buyBox(input: $input)
      }
    `,
    variables: {
      input: {box_price_uid, round_id, quantity}
    }
  })

  return res
}
