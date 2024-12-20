import { LCTokenNFTMySellOrders } from './LCTokenNFTMySellOrders';
import { LCTokenNFTSellOrder } from './LCTokenNFTSellOrder';

export const LCTokenNFTSell = ({
  address,
  id,
  sellOrders,
}: {
  address: string;
  id: number;
  sellOrders: {
    owner: string;
    tokenId: number;
    balance: number;
    orderId: number;
  }[];
}) => (
  <>
    {sellOrders.length > 0 ? (
      <LCTokenNFTMySellOrders address={address} id={id} orders={sellOrders} />
    ) : (
      <LCTokenNFTSellOrder address={address} id={id} />
    )}
  </>
);
