/* eslint-disable no-restricted-syntax */
import { useCall } from '@usedapp/core';
import { constants, Contract, utils } from 'ethers';
import LCTokenNFT from '../../config/LCTokenNFT';

export interface LCTokenNFTInterface {
  meta: string;
  name: string;
  symbol: string;
  totalSupply: number;
}

export const useLCTokenNFTAllData = (address: any) => {
  const { abi } = LCTokenNFT;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);

  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'getTokenAll',
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }

  return {
    meta: value?.[0],
    name: value?.[1],
    symbol: value?.[2],
    totalSupply: value?.[3],
  };
};

export const useLCTokenNFTContract = (address: any) => {
  const { abi } = LCTokenNFT;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  return LCTokenContract;
};
