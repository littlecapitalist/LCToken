import { Fragment, useEffect, useState } from 'react';
import { Button, Grid, Text } from '@mantine/core';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import {
  LCTokenShareAllSellOffers,
  LCTokenShareTradeBuyOffer,
} from '../../hooks/LCToken/LCTokenShareTradeFunction';
import { Loader } from '../Loader/Loader';

export const LCTokenAllSellOrders = ({ address }: { address: string }) => {
  const sellOrders = LCTokenShareAllSellOffers(address) || [[]];
  const { placeBuyOrder, buyOfferState } = LCTokenShareTradeBuyOffer(address);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (buyOfferState.status === 'Exception') {
      mantineNotifications.show({
        message: buyOfferState.errorMessage || '',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
    }
    if (buyOfferState.status === 'Success') {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
    }
  }, [buyOfferState]);

  // _shareValues, _ethValues, _balances, _ids
  return (
    <>
      {sellOrders[0][0] !== undefined ? (
        <>
          <Grid>
            <Grid.Col span={3}>
              <small>ETH</small>
            </Grid.Col>
            <Grid.Col span={3}>
              <small>SHARES</small>
            </Grid.Col>
            <Grid.Col span={3}>
              <small>TOTAL</small>
            </Grid.Col>
            <Grid.Col span={3}>
              <small>FILL ORDER</small>
            </Grid.Col>

            {sellOrders[0].map((data: any, index: any) => (
              <Fragment key={index}>
                <Grid.Col span={3}>{Number(sellOrders[1][index]) / 10 ** 18}</Grid.Col>
                <Grid.Col span={3}>{Number(sellOrders[0][index])}</Grid.Col>
                <Grid.Col span={3}>
                  {(Number(sellOrders[1][index]) * Number(sellOrders[0][index])) / 10 ** 18}
                </Grid.Col>
                <Grid.Col span={3}>
                  <Button
                    id={`fillBuyOrder_${index}`}
                    size="xs"
                    radius="xl"
                    onClick={() => {
                      setShowLoader(true);
                      placeBuyOrder(Number(sellOrders[2][index]), Number(sellOrders[1][index]));
                    }}
                  >
                    Fill Order
                  </Button>
                </Grid.Col>

                {showLoader && <Loader />}
              </Fragment>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Text>No Sell Orders</Text>
        </>
      )}
    </>
  );
};
