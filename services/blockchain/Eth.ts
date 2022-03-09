import { ethers } from 'ethers'
import AnimTokenErc20Abi from './abi/AnimTokenErc20Abi.json'
import Erc721Abi from './abi/Erc721Abi.json'
import { makeError } from "../../utils/Error";

class EtherContract {
  static ErrorCode = {
    NotInitialized: 'NotInitialized',
  }

  private _web3Provider?: ethers.providers.Web3Provider;

  get web3Provider(): ethers.providers.Web3Provider | undefined {
    return this._web3Provider;
  }

  set web3Provider(value: ethers.providers.Web3Provider | undefined) {
    this._web3Provider = value;
  }

  private getSigner(): ethers.providers.JsonRpcSigner {
    if (!this._web3Provider) {
      throw makeError(EtherContract.ErrorCode.NotInitialized, "Contract._web3Provider was not set");
    }

    return this._web3Provider.getSigner()
  }

  getContractWithSignerErc20(contractAddress: string): ethers.Contract {
    return new ethers.Contract(contractAddress, AnimTokenErc20Abi.abi, this.getSigner())
  }

  getContractWithSignerErc721(contractAddress: string): ethers.Contract {
    return new ethers.Contract(contractAddress, Erc721Abi, this.getSigner())
  }

  async getBalanceOf(address: string, erc20ContractAddress: string): Promise<number> {
    const contract = await this.getContractWithSignerErc20(erc20ContractAddress)
    return contract.balanceOf(address)
  }

  async getMyAddress() {
    return this.getSigner().getAddress()
  }

  /**
   * Get my address allowance
   *
   * @param address not sure
   * @param erc20Address not sure
   */
  async getMyAllowanceOf(
    address: string,
    erc20Address: string
  ): Promise<number | null> {
    const myAddress = await this.getMyAddress();
    const contract = await this.getContractWithSignerErc20(erc20Address)

    const res = await contract.allowance(myAddress, address).catch((e: any) => {
      console.error('{getAllowance} catch e: ', e)
      return null
    })

    return res === null ? res : ethers.utils.formatEther(res)
  }


  async requestApproval(
    address: string,
    erc20Address: string
  ): Promise<boolean> {
    const contract = await this.getContractWithSignerErc20(erc20Address)
    const res = await contract
      .approve(address, ethers.constants.MaxUint256)
      .catch((e: any) => {
        console.error('{requestApproval} catch e: ', e)
        return false
      })

    return res
  }

  async transferNft(
    toAddress: string,
    nftBoxContractAddress: string,
    nftTokenId: number
  ): Promise<any | false> {
    try {
      // const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
      // const boxContract = new ethers.Contract(
      //   nftBoxContractAddress,
      //   erc721ABI,
      //   ethersProvider
      // )
      // const boxContractSigner = boxContract.connect(ethersProvider.getSigner())
      // const [myAddress] = await window.ethereum.request({
      //   method: 'eth_requestAccounts',
      // })

      const myAddress = await this.getMyAddress();
      const boxContractSigner = this.getContractWithSignerErc721(nftBoxContractAddress)

      const transaction = await boxContractSigner.transferFrom(
        myAddress,
        toAddress,
        nftTokenId
      )
      return transaction.wait()
    } catch (error) {
      console.log('{EtherContract.transferNft} error: ', error)
      return false
    }
  }
}

/**
 * AppEthContractInterface
 */
export default new EtherContract()
