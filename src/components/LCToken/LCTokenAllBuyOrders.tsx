import { Fragment, useEffect, useState } from 'react';
import { Button, Grid, Text } from '@mantine/core';

import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import {
  LCTokenShareAllBuyOffers,
  LCTokenShareTradeSellOfferApprove,
} from '../../hooks/LCToken/LCTokenShareTradeFunction';
import { Loader } from '../Loader/Loader';

export const LCTokenAllBuyOrders = ({ address }: { address: string }) => {
  const buyOrders = LCTokenShareAllBuyOffers(address) || [[]];
  const [sellShareQty, setSellShareQty] = useState(1);
  const [sellShareETH, setSellShareETH] = useState(0);
  const { approveShares, ApproveSharesState, sellOfferState } = LCTokenShareTradeSellOfferApprove(
    address,
    sellShareQty,
    sellShareETH
  );

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (ApproveSharesState.status === 'Exception') {
      mantineNotifications.show({
        message: ApproveSharesState.errorMessage || '',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
    }
    if (ApproveSharesState.status === 'Success') {
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
  }, [sellOfferState, ApproveSharesState]);

  // _shareValues, _ethValues, _balances, _ids
  return (
    <>
      {buyOrders[0][0] !== undefined ? (
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

            {buyOrders[0].map((data: any, index: any) => (
              <Fragment key={index}>
                <Grid.Col span={3}>{Number(buyOrders[1][index]) / 10 ** 18}</Grid.Col>
                <Grid.Col span={3}>{Number(buyOrders[0][index])}</Grid.Col>
                <Grid.Col span={3}>
                  {(Number(buyOrders[1][index]) * Number(buyOrders[0][index])) / 10 ** 18}
                </Grid.Col>
                <Grid.Col span={3}>
                  <Button
                    id={`fillBuyOrder_${index}`}
                    size="xs"
                    radius="xl"
                    onClick={() => {
                      setSellShareQty(Number(buyOrders[0][index]));
                      setSellShareETH(Number(buyOrders[1][index] / 10 ** 18));
                      setShowLoader(true);
                      approveShares(sellShareQty);
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
          <Text>No Buy Orders</Text>
        </>
      )}
    </>
  );
};
