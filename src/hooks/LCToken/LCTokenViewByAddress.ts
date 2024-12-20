import { useCall } from '@usedapp/core';
import { constants, utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import LCToken from '../../config/LCToken';

export const LCTokenViewById = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'getMetaData',
        args: [],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};

export const LCTokenViewPriceById = (address: any) => {
  const { abi } = LCToken;

  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'getContractSalePrice',
        args: [],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};
export const LCTokenViewForSaleById = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'isForSale',
        args: [],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};

export const LCTokenViewTokenBalanceById = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'contractTokenBalance',
        args: [],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const LCTokenViewOwnersById = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'getOwners',
        args: [],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const LCTokenPriceETHById = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'getContractPriceInETH',
        args: [],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const LCTokenSymbol = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'symbol',
        args: [],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const LCTokenName = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall({
      contract: LCTokenContract,
      method: 'name',
      args: [],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const LCTokenTotalSupply = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'totalSupply',
        args: [],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const LCTokenProvinanceItem = (address: any, index: number) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'getProvinanceByIndex',
        args: [index],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value;
};

export const LCTokenProvinace = (address: any) => {
  const provinance = [];
  const temp = LCTokenProvinanceItem(address, 0);
  provinance.push(temp);
  return provinance;
};

export const LCTokenGetSharePrice = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'getSharePrice',
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

export const LCTokenGetContractPrice = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'getContractSalePrice',
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};

export default {
  LCTokenViewById,
  LCTokenViewPriceById,
  LCTokenViewForSaleById,
  LCTokenViewTokenBalanceById,
  LCTokenPriceETHById,
  LCTokenViewOwnersById,
  LCTokenSymbol,
  LCTokenName,
  LCTokenTotalSupply,
  LCTokenProvinace,
  LCTokenGetSharePrice,
  LCTokenGetContractPrice,
};
