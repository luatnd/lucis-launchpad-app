import { gql, useMutation } from "@apollo/client";
import { notification } from "antd";
import { useInput } from "hooks/common/use_input";
import { useMemo, useState } from "react";
import { GBoxCampaignRound, GBoxPrice, GBoxType } from "src/generated/graphql";
import { handleApolloError } from "utils/apollo_client";

import EthersService from "services/blockchain/Ethers";
import { nonReactive as ConnectWalletStore_NonReactiveData } from "components/Auth/ConnectWalletStore";

export function useBuyBox(
  boxType: GBoxType,
  round: GBoxCampaignRound | undefined,
  isInWhitelist: boolean | undefined
) {
  const [buyBox, { data, loading, error }] = useMutation(BUY_BOX_MUT);

  const chainSymbol = "bsc";
  const boxPrice: GBoxPrice | undefined =
    (boxType.prices?.length ?? 0) > 0
      ? boxType.prices!.find(
          (item) => item.chain_symbol?.toLowerCase() === chainSymbol
        )
      : undefined;

  const requireWhitelist =
    round?.is_whitelist === false && round?.require_whitelist === true;
  // can buy box: in buy round + enough box to buy + registered whitelist if need
  const canBuyBox = useMemo(() => {
    return (
      round?.is_whitelist === false &&
      boxType.total_amount > boxType.sold_amount
      //   && (requireWhitelist ? registeredWhitelist : true)
    );
  }, [boxType, round]);

  const txtAmount = useInput("");
  const [err, setErr] = useState<string | undefined>();

  const onBuyBox = function () {
    if (!boxPrice) {
      setErr("Box price not found!");
      return;
    }
    if (!round) {
      setErr("Round not found!");
      return;
    }
    if (round.require_whitelist === true && !isInWhitelist) {
      notification["error"]({
        message: "You not register whitelist before!",
      });
      return;
    }

    const quantity = parseFloat(txtAmount.value ?? "0");
    if (!txtAmount.value || quantity <= 0) {
      txtAmount.setErr("Quantity must be greater than 0");
      return;
    }
    // console.log("round: ", round);
    setErr(undefined);

    buyBox({
      variables: {
        input: {
          box_price_uid: boxPrice?.uid,
          round_id: round?.id ?? 0,
          quantity: quantity,
        },
      },
    }).catch((err) => {
      // console.log("err: ", err);
      handleApolloError(err);
    });
  };

  const onApprove = async function () {
    if (!ConnectWalletStore_NonReactiveData.web3Provider) {
      notification["warn"]({
        message: "Please connect wallet!",
      });
      return;
    }

    const ethersService = new EthersService(
      ConnectWalletStore_NonReactiveData.web3Provider
    );
    await ethersService.getMyAddress();

    //Todo: get contract address from box price
    const contract_addr = "";
    const currency_addr = ""; // address of token to buy
    ethersService.requestApproval(contract_addr, currency_addr);
  };

  return {
    loading,
    canBuyBox,
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
