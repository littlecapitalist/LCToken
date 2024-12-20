import { Fragment, useEffect, useState } from 'react';
import { Button, Grid, Text } from '@mantine/core';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import {
  LCTokenShareAllBuyOffersOwner,
  LCTokenShareCancelBuyOffer,
} from '../../hooks/LCToken/LCTokenShareTradeFunction';
import { Loader } from '../Loader/Loader';

export const LCTokenBuyOrders = ({ address }: { address: string }) => {
  const buyOrders = LCTokenShareAllBuyOffersOwner(address) || [[]];
  const { cancelBuyOrder, cancelBuyOrderState } = LCTokenShareCancelBuyOffer(address);

  const [showLoader, setShowLoader] = useState(false);
  // snack bars

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

  let total = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const x in buyOrders[0]) {
    if (buyOrders[4][x] === 0) {
      total += Number(buyOrders[3][x]) / 10 ** 18;
    }
  }
  return (
    <>
      {buyOrders[0][0] !== undefined ? (
        <>
          <small>
            {' '}
            You have <strong id="heldEth">{total}</strong> held ETH
          </small>

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
            {buyOrders[0].map(
              (data: any, index: any) =>
                buyOrders[4][index] === 0 && (
                  <Fragment key={index}>
                    {' '}
                    <Grid.Col span={1}>{Number(buyOrders[5][index])}</Grid.Col>
                    <Grid.Col span={4}>{Number(buyOrders[2][index]) / 10 ** 18}</Grid.Col>
                    <Grid.Col span={4}>{Number(buyOrders[1][index])}</Grid.Col>
                    <Grid.Col span={3}>
                      <Button
                        id={`cancelBuyOrder_${index}`}
                        size="xs"
                        radius="xl"
                        onClick={() => {
                          setShowLoader(true);
                          cancelBuyOrder(Number(buyOrders[5][index]));
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
          <Text>You have no active Buy Orders</Text>
        </>
      )}
    </>
  );
};
