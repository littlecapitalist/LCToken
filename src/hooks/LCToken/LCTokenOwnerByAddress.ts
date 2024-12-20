import { useContractFunction } from '@usedapp/core';

import { constants, utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import LCToken from '../../config/LCToken';

export const LCTokenOwnerSetForSale = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);

  const { state: lcTokenSetForSaleState, send: SetLCTokenForSale } = useContractFunction(
    LCTokenContract,
    'setForSaleOn',
    { transactionName: 'Set FOR SALE' }
  );

  return { SetLCTokenForSale, lcTokenSetForSaleState };
};

export const LCTokenOwnerSetNotForSale = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);

  const { state: lcTokenSetNotForSaleState, send: SetLCTokenNotForSale } = useContractFunction(
    LCTokenContract,
    'setForSaleOff',
    { transactionName: 'Set FOR SALE' }
  );

  return { SetLCTokenNotForSale, lcTokenSetNotForSaleState };
};

export const LCTokenOwnerSetMetaData = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);

  const { state: lcTokenSetMetaDataState, send: SetLCTokenMetaData } = useContractFunction(
    LCTokenContract,
    'setMetaData',
    { transactionName: 'Set Meta Data' }
  );
  return { SetLCTokenMetaData, lcTokenSetMetaDataState };
};

export const LCTokenReleaseTokens = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);

  const { state: lcTokenReleaseTokensState, send: lcTokenReleaseTokens } = useContractFunction(
    LCTokenContract,
    'contractReleaseTokens',
    { transactionName: 'Release Tokens' }
  );
  return { lcTokenReleaseTokens, lcTokenReleaseTokensState };
};

export default {
  LCTokenOwnerSetForSale,
  LCTokenOwnerSetNotForSale,
  LCTokenReleaseTokens,
};
