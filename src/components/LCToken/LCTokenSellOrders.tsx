import React, { Fragment, useEffect, useState } from 'react';
import { Button, Grid, Text } from '@mantine/core';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

import {
  LCTokenShareAllSellOffersOwner,
  LCTokenShareCancelSellOffer,
} from '../../hooks/LCToken/LCTokenShareTradeFunction';
import { Loader } from '../Loader/Loader';

export const LCTokenSellOrders = ({ address }: { address: string }) => {
  const sellOrders = LCTokenShareAllSellOffersOwner(address) || [[]];
  const { cancelSellOrder, cancelSellOrderState } = LCTokenShareCancelSellOffer(address);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (cancelSellOrderState.status === 'Exception') {
      mantineNotifications.show({
        message: cancelSellOrderState.errorMessage || '',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
    }
    if (cancelSellOrderState.status === 'Success') {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
    }
  }, [cancelSellOrderState]);

  let total = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const x in sellOrders[0]) {
    if (sellOrders[4][x] === 0) {
      total += parseInt(sellOrders[3][x], 10);
    }
  }
  return (
    <>
      {sellOrders[0][0] !== undefined ? (
        <>
          <small> You have {total} held Shares</small>

          <Grid>
            <Grid.Col span={1}>
              <small>ID</small>
            </Grid.Col>
            <Grid.Col span={4}>
              <small>ETH</small>
            </Grid.Col>
            <Grid.Col span={4}>
              <small>SHARES</small>
            </Grid.Col>
            <Grid.Col span={3}>
              <small>CANCEL</small>
            </Grid.Col>
            {sellOrders[0].map(
              (data: any, index: any) =>
                sellOrders[4][index] === 0 && (
                  <Fragment key={index}>
                    <Grid.Col span={1}>{Number(sellOrders[5][index])}</Grid.Col>
                    <Grid.Col span={4}>{Number(sellOrders[2][index]) / 10 ** 18}</Grid.Col>
                    <Grid.Col span={4}>{Number(sellOrders[3][index])}</Grid.Col>
                    <Grid.Col span={3}>
                      <Button
                        id={`cancelSellOrder_${index}`}
                        size="xs"
                        radius="xl"
                        p={10}
                        onClick={() => {
                          setShowLoader(true);
                          cancelSellOrder(Number(sellOrders[5][index]));
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid.Col>
                  </Fragment>
                )
            )}
          </Grid>
          {showLoader && <Loader />}
        </>
      ) : (
        <>
          <Text>You have no active Sell Orders</Text>
        </>
      )}
    </>
  );
};
