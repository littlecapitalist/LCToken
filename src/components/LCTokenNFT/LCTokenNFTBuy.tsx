import { Tabs } from '@mantine/core';
import { LCTokenNFTBuyOrders } from './LCTokenNFTBuyOrders';
import { LCTokenNFTMyBuyOrders } from './LCTokenNFTMyBuyOrders';
import { LCTokenNFTBuyOrder } from './LCTokenNFTBuyOrder';

export const LCTokenNFTBuy = ({
  address,
  id,
  owner,
  buyOrders,
}: {
  address: string;
  id: number;
  owner: boolean;
  buyOrders: {
    owner: string;
    tokenId: number;
    balance: number;
    orderId: number;
  }[];
}) => (
  <>
    {!owner ? (
      <>
        <Tabs defaultValue="three">
          <Tabs.List>
            <Tabs.Tab value="three">My Offers</Tabs.Tab>
            <Tabs.Tab value="two">Offer</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="three" mt={20}>
            <LCTokenNFTMyBuyOrders address={address} id={id} orders={buyOrders} />
          </Tabs.Panel>

          <Tabs.Panel value="two" mt={20}>
            <LCTokenNFTBuyOrder address={address} id={id} />
          </Tabs.Panel>
        </Tabs>
      </>
    ) : (
      <LCTokenNFTBuyOrders address={address} id={id} orders={buyOrders} />
    )}
  </>
);
