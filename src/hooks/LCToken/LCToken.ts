import { useCall, useCalls } from '@usedapp/core';
import { constants, utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import LCToken from '../../config/LCToken';

export const LCTokenTokenOwnerBalance = (address: any, tokenOwnerAddress: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);

  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'balanceOf',
        args: [tokenOwnerAddress],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export interface LCTokenInterface {
  owners: [string];
  tokenMeta: {
    mediaDataPackURI: string;
  };
  name: string;
  symbol: string;
  totalSupply: number;
  getContractSalePrice: number;
  getSharePrice: number;
  contractTokenBalance: number;
  isForSale: boolean;
  getHeldShares: number;
  getHeldETH: number;
  balanceOfHeldShares: number;
  decimals: number;
}

export const LCTokenAllData = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const calls = [
    {
      contract: LCTokenContract,
      method: 'getOwners',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: 'getMetaData',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: 'name',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: 'symbol',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: 'totalSupply',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: 'getContractSalePrice',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: ' getSharePrice',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: 'contractTokenBalance',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: 'isForSale',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: 'getHeldShares',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: 'getHeldETH',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: 'balanceOfHeldShares',
      args: [],
    },
    {
      contract: LCTokenContract,
      method: 'decimals',
      args: [],
    },
  ];

  const results = useCalls(calls) ?? [];

  return {
    owners: results[0]?.value?.[0],
    tokenMeta: results[1]?.value?.[0],
    name: results[2]?.value?.[0],
    symbol: results[3]?.value?.[0],
    totalSupply: results[4]?.value?.[0],
    getContractSalePrice: results[5]?.value?.[0],
    getSharePrice: results[6]?.value?.[0],
    contractTokenBalance: results[7]?.value?.[0],
    isForSale: results[8]?.value?.[0],
    getHeldShares: results[9]?.value?.[0],
    getHeldETH: results[10]?.value?.[0],
    balanceOfHeldShares: results[11]?.value?.[0],
    decimals: results[12]?.value?.[0],
  };
};
