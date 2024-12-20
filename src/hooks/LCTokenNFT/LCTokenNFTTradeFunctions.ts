import { BigNumber, constants, Contract, utils } from 'ethers';
import { useCall, useContractFunction } from '@usedapp/core';
import { useEffect } from 'react';
import LCTokenNFT from '../../config/LCTokenNFT';

export const useLCTokenNFTBuyOffer = (address: any) => {
  const { abi } = LCTokenNFT;
  const LCTokenNFTInterface = new utils.Interface(abi);
  const LCTokenNFTContract = new Contract(address, LCTokenNFTInterface);

  const { state: buyOfferState, send: _placeBuyOrder } = useContractFunction(
    LCTokenNFTContract,
    'placeBuyOrder',
    { transactionName: 'Place Buy Order' }
  );

  useEffect(() => {
    if (buyOfferState.status === 'Exception') {
      console.log(buyOfferState.errorMessage);
    }
  }, [buyOfferState]);
  const placeBuyOrder = (nftID: any, nftPrice: any) => {
    const sp = BigNumber.from(BigInt(nftPrice));
    _placeBuyOrder(nftID, { value: sp });
  };
  return { placeBuyOrder, buyOfferState };
};

export const useLCTokenNFTTradeSellOffer = (address: any) => {
  const { abi } = LCTokenNFT;
  const LCTokenNFTInterface = new utils.Interface(abi);
  const LCTokenNFTContract = new Contract(address, LCTokenNFTInterface);

  const { state: sellOfferState, send: placeSellOrder } = useContractFunction(
    LCTokenNFTContract,
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

export const useLCTokenNFTTradeSellOfferApprove = (
  address: string,
  id: number,
  tokenETH: number
) => {
  const { abi } = LCTokenNFT;

  const LCTokenNFTAddress = address || constants.AddressZero;
  const LCTokenNFTInterface = new utils.Interface(abi);
  const LCTokenNFTContract = new Contract(LCTokenNFTAddress, LCTokenNFTInterface);

  const { state: sellOfferState, send: placeSellOrder } = useContractFunction(
    LCTokenNFTContract,
    'placeSellOrder',
    { transactionName: 'Place Sell Order' }
  );

  const { state: ApproveNFTState, send: ApproveNFT } = useContractFunction(
    LCTokenNFTContract,
    'approve',
    { transactionName: 'Approve NFT' }
  );

  useEffect(() => {
    if (ApproveNFTState.status === 'Exception') {
      console.log(ApproveNFTState.errorMessage);
    }
    if (ApproveNFTState.status === 'Success') {
      const ETH = BigInt(tokenETH * 1e18);
      const nftID = BigNumber.from(id);
      const sp = BigNumber.from(ETH);
      console.log(ETH, nftID, sp);
      placeSellOrder(nftID, sp);
    }
  }, [ApproveNFTState]);

  useEffect(() => {
    if (sellOfferState.status === 'Exception') {
      console.log(sellOfferState.errorMessage);
    }
  }, [sellOfferState]);

  const approveNFT = (_id: any) => {
    ApproveNFT(address, _id);
  };
  return { approveNFT, ApproveNFTState, sellOfferState };
};

export const LCTokenNFTSellOrdersGET = (address: string) => {
  const { abi } = LCTokenNFT;

  const LCTokenNFTAddress = address || constants.AddressZero;
  const LCTokenNFTInterface = new utils.Interface(abi);
  const LCTokenNFTContract = new Contract(LCTokenNFTAddress, LCTokenNFTInterface);
  const { value, error } =
    useCall(
      LCTokenNFTContract && {
        contract: LCTokenNFTContract,
        method: 'getSellOrders',
        args: [],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
};

export const LCTokenNFTBuyOrdersGET = (address: string) => {
  const { abi } = LCTokenNFT;
  const LCTokenNFTAddress = address || constants.AddressZero;
  const LCTokenNFTInterface = new utils.Interface(abi);
  const LCTokenNFTContract = new Contract(LCTokenNFTAddress, LCTokenNFTInterface);
  const { value, error } =
    useCall(
      LCTokenNFTContract && {
        contract: LCTokenNFTContract,
        method: 'getBuyOrders',
        args: [],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
};

export const useLCTokenNFTCancelBuyOffer = (address: any) => {
  const { abi } = LCTokenNFT;
  const LCTokenInterface = new utils.Interface(abi);
  const LCTokenContract = new Contract(address, LCTokenInterface);
  const { state: cancelBuyOrderState, send: cancelBuyOrder } = useContractFunction(
    LCTokenContract,
    'cancelBuyOffer',
    { transactionName: 'Cancel Buy Order' }
  );
  return { cancelBuyOrder, cancelBuyOrderState };
};

export const useLCTokenNFTCancelSellOffer = (address: any) => {
  const { abi: abiGallery } = LCTokenNFT;
  const LCTokenInterface = new utils.Interface(abiGallery);
  const LCTokenContract = new Contract(address, LCTokenInterface);
  const { state: cancelSellOrderState, send: cancelSellOrder } = useContractFunction(
    LCTokenContract,
    'cancelSellOrder',
    { transactionName: 'Cancel Sell Order' }
  );
  return { cancelSellOrder, cancelSellOrderState };
};
