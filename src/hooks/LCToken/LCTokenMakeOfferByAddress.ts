import { useContractFunction } from '@usedapp/core';
import { constants, utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { useEffect } from 'react';
import LCToken from '../../config/LCToken';

export const LCTokenMakeOffer = (address: any) => {
  // test if logged in as owner

  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);

  const { state: lcTokenMakeOfferState, send: lcTokenMakeOffer } = useContractFunction(
    LCTokenContract,
    'makeOfferToBuyContract',
    { transactionName: 'Purchase Offer' }
  );

  useEffect(() => {
    if (lcTokenMakeOfferState.status === 'Exception') {
      console.log(lcTokenMakeOfferState.errorMessage);
    }
  }, [lcTokenMakeOfferState]);

  return { lcTokenMakeOffer, lcTokenMakeOfferState };
};

export default LCTokenMakeOffer;
