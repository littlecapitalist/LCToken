import { Fragment, useEffect, useState } from 'react';
import { Button, Grid, Text } from '@mantine/core';

import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

import { useEthers } from '@usedapp/core';
import { Loader } from '../Loader/Loader';
import { useLCTokenNFTTradeSellOfferApprove } from '../../hooks/LCTokenNFT/LCTokenNFTTradeFunctions';

export const LCTokenNFTBuyOrders = ({
  address,
  id,
  orders,
}: {
  address: string;
  id: number;
  orders: {
    owner: string;
    tokenId: number;
    balance: number;
    orderId: number;
  }[];
}) => {
  const { account } = useEthers();
  const [sellShareETH, setSellShareETH] = useState(0);
  const { approveNFT, ApproveNFTState, sellOfferState } = useLCTokenNFTTradeSellOfferApprove(
    address,
    id,
    sellShareETH
  );

  const buyOrders =
    (orders && orders.filter((order: { tokenId: number }) => order.tokenId === id)) ?? [];

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (ApproveNFTState.status === 'Exception') {
      mantineNotifications.show({
        message: ApproveNFTState.errorMessage || '',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
    }
    if (ApproveNFTState.status === 'Success') {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
    }

    if (sellOfferState.status === 'Exception') {
      mantineNotifications.show({
        message: sellOfferState.errorMessage || '',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
    }
    if (sellOfferState.status === 'Success') {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
    }
  }, [sellOfferState, ApproveNFTState]);

  return (
    <>
      {buyOrders.length > 0 ? (
        <>
          <Grid>
            <Grid.Col span={9}>
              <small>ETH</small>
            </Grid.Col>
            <Grid.Col span={3}>
              <small>Accept</small>
            </Grid.Col>

            {buyOrders.map((buyOrder: any, index: any) => (
              <Fragment key={index}>
                <Grid.Col span={9}>{Number(buyOrder.balance) / 10 ** 18}</Grid.Col>
                <Grid.Col span={3}>
                  {buyOrder.orderOwner === account && (
                    <Button
                      id={`fillBuyOrder_${index}`}
                      size="xs"
                      radius="xl"
                      onClick={() => {
                        setSellShareETH(Number(buyOrder.balance / 10 ** 18));
                        setShowLoader(true);
                        approveNFT(id);
                      }}
                    >
                      Fill Order
                    </Button>
                  )}
                </Grid.Col>

                {showLoader && <Loader />}
              </Fragment>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Text>No Offers</Text>
        </>
      )}
    </>
  );
};
