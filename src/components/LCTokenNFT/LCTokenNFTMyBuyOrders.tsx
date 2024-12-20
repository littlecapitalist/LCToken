import { Fragment, useEffect, useState } from 'react';
import { Button, Grid, Text } from '@mantine/core';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

import { useEthers } from '@usedapp/core';
import { useLCTokenNFTCancelBuyOffer } from '../../hooks/LCTokenNFT/LCTokenNFTTradeFunctions';
import { Loader } from '../Loader/Loader';

export const LCTokenNFTMyBuyOrders = ({
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
  const buyOrders =
    (orders &&
      orders.filter(
        (order: { owner: string; tokenId: number }) =>
          order.tokenId === id && order.owner === account
      )) ??
    [];

  const { cancelBuyOrder, cancelBuyOrderState } = useLCTokenNFTCancelBuyOffer(address);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (cancelBuyOrderState.status === 'Exception') {
      mantineNotifications.show({
        message: cancelBuyOrderState.errorMessage || '',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
    }
    if (cancelBuyOrderState.status === 'Success') {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
    }
  }, [cancelBuyOrderState]);

  return (
    <>
      {buyOrders.length > 0 ? (
        <>
          <Grid>
            <Grid.Col span={2}>
              <small>ID</small>
            </Grid.Col>
            <Grid.Col span={7}>
              <small>ETH</small>
            </Grid.Col>
            <Grid.Col span={3}>
              <small>CANCEL</small>
            </Grid.Col>
            {buyOrders.map((buyOrder: any, index: any) => (
              <Fragment key={index}>
                <Grid.Col span={1}>{Number(buyOrder.orderId)}</Grid.Col>
                <Grid.Col span={8}>{Number(buyOrder.balance) / 10 ** 18}</Grid.Col>
                <Grid.Col span={3}>
                  <Button
                    id={`cancelBuyOrder_${index}`}
                    size="xs"
                    radius="xl"
                    p={10}
                    onClick={() => {
                      setShowLoader(true);
                      cancelBuyOrder(buyOrder.orderId);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid.Col>
              </Fragment>
            ))}
          </Grid>
          {showLoader && <Loader />}
        </>
      ) : (
        <>
          <Text>You have no active offers</Text>
        </>
      )}
    </>
  );
};
