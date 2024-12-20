import { useEffect } from 'react';
import { useContractFunction, useCall, useEthers } from '@usedapp/core';
import { constants, utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import LCToken from '../../config/LCToken';

export const LCTokenShareTradeBuyOffer = (address: any) => {
  const { abi } = LCToken;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(address, LCTokenInterface);

  const { state: buyOfferState, send: _placeBuyOrder } = useContractFunction(
    LCTokenContract,
    'placeBuyOrder',
    { transactionName: 'Place Buy Order' }
  );

  useEffect(() => {
    if (buyOfferState.status === 'Exception') {
      console.log(buyOfferState.errorMessage);
    }
  }, [buyOfferState]);
  const placeBuyOrder = (shareQty: any, sharePrice: any) => {
    const sq = BigNumber.from(shareQty);
    const sp = BigNumber.from(BigInt(sharePrice));
    const p = sq.mul(sp);
    _placeBuyOrder(shareQty, sp, { value: p });
  };
  return { placeBuyOrder, buyOfferState };
};

export const LCTokenShareTradeSellOffer = (address: any) => {
  const { abi } = LCToken;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(address, LCTokenInterface);

  const { state: sellOfferState, send: placeSellOrder } = useContractFunction(
    LCTokenContract,
    'placeSellOrder',
    { transactionName: 'Place Sell Order' }
  );

  useEffect(() => {
    if (sellOfferState.status === 'Exception') {
      console.log(sellOfferState.errorMessage);
    }
  }, [sellOfferState]);

  return { placeSellOrder, sellOfferState };
};

export const LCTokenShareTradeSellOfferApprove = (address: any, shareQty: any, shareETH: any) => {
  const { abi } = LCToken;

  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);

  const { state: sellOfferState, send: placeSellOrder } = useContractFunction(
    LCTokenContract,
    'placeSellOrder',
    { transactionName: 'Place Sell Order' }
  );

  const { state: ApproveSharesState, send: ApproveShares } = useContractFunction(
    LCTokenContract,
    'approve',
    { transactionName: 'Approve Shares' }
  );

  useEffect(() => {
    if (ApproveSharesState.status === 'Exception') {
      console.log(ApproveSharesState.errorMessage);
    }
    if (ApproveSharesState.status === 'Success') {
      const ETH = BigInt(shareETH * 1e18);
      console.log(ETH, shareETH);
      const sq = BigNumber.from(shareQty);
      const sp = BigNumber.from(ETH);
      //const p = sq.mul(sp);

      placeSellOrder(sq, sp);
    }
  }, [ApproveSharesState]);

  useEffect(() => {
    if (sellOfferState.status === 'Exception') {
      console.log(sellOfferState.errorMessage);
    }
  }, [sellOfferState]);

  const approveShares = (qty: any) => {
    console.log(qty);
    ApproveShares(address, qty);
  };
  return { approveShares, ApproveSharesState, sellOfferState };
};

export const LCTokenShareAllBuyOffers = (address: any) => {
  const { abi } = LCToken;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(address, LCTokenInterface);

  const { value, error } =
    useCall(
      address && {
        contract: LCTokenContract,
        method: 'getAllBuyOrders',
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
};

export const LCTokenShareAllSellOffers = (address: any) => {
  const { abi } = LCToken;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(address, LCTokenInterface);

  const { value, error } =
    useCall(
      address && {
        contract: LCTokenContract,
        method: 'getAllSellOrders',
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
};

export const LCTokenShareAllBuyOffersOwner = (address: any) => {
  const { account } = useEthers();

  const { abi } = LCToken;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(address, LCTokenInterface);

  const { value, error } =
    useCall(
      address && {
        contract: LCTokenContract,
        method: 'getBuyOrdersByAddress',
        args: [account],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
};

export const LCTokenShareAllSellOffersOwner = (address: any) => {
  const { account } = useEthers();

  const { abi } = LCToken;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(address, LCTokenInterface);
  const { value, error } =
    useCall(
      address && {
        contract: LCTokenContract,
        method: 'getSellOrdersByAddress',
        args: [account],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
};

export const LCTokenShareAllEvents = (address: any) => {
  const { abi } = LCToken;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(address, LCTokenInterface);

  const { value, error } =
    useCall(
      address && {
        contract: LCTokenContract,
        method: 'getTransactions',
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
};

export const LCTokenShareOwn = (address: any, tokenOwnerAddress: any) => {
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

export const LCTokenSharesInOffers = (address: any) => {
  const { abi } = LCToken;
  const LCTokenAddress = address || constants.AddressZero;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(LCTokenAddress, LCTokenInterface);
  const { value, error } =
    useCall(
      LCTokenAddress && {
        contract: LCTokenContract,
        method: 'balanceOfHeldShares',
        args: [LCTokenContract],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};

//export const LCTokenShareOwnInOffers = (address: any) => false;

export const LCTokenShareCancelBuyOffer = (address: any) => {
  const { abi } = LCToken;

  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(address, LCTokenInterface);

  const { state: cancelBuyOrderState, send: cancelBuyOrder } = useContractFunction(
    LCTokenContract,
    'cancelBuyOrder',
    { transactionName: 'Cancel Sell Order' }
  );
  return { cancelBuyOrder, cancelBuyOrderState };
};

export const LCTokenShareCancelSellOffer = (address: any) => {
  const { abi: abiGallery } = LCToken;

  const LCTokenInterface = new utils.Interface(abiGallery);
  const LCTokenContract = new Contract(address, LCTokenInterface);

  const { state: cancelSellOrderState, send: cancelSellOrder } = useContractFunction(
    LCTokenContract,
    'cancelSellOrder',
    { transactionName: 'Cancel Sell Order' }
  );
  return { cancelSellOrder, cancelSellOrderState };
};

export default {
  LCTokenShareTradeBuyOffer,
  LCTokenShareTradeSellOffer,
  LCTokenShareTradeSellOfferApprove,
  LCTokenShareAllBuyOffers,
  LCTokenShareAllBuyOffersOwner,
  LCTokenShareAllSellOffersOwner,
  LCTokenShareAllSellOffers,
  LCTokenShareAllEvents,
  LCTokenShareOwn,
  LCTokenSharesInOffers,
  // LCTokenShareOwnInOffers,
  LCTokenShareCancelBuyOffer,
  LCTokenShareCancelSellOffer,
};
