import { Fragment, useEffect, useState } from 'react';
import { Button, Group, NumberFormatter } from '@mantine/core';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

import { useEthers } from '@usedapp/core';
import { useLCTokenNFTCancelSellOffer } from '../../hooks/LCTokenNFT/LCTokenNFTTradeFunctions';
import { Loader } from '../Loader/Loader';

export const LCTokenNFTMySellOrders = ({
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
  const sellOrders =
    (orders &&
      orders.filter(
        (order: { owner: string; tokenId: number }) =>
          order.tokenId === id && order.owner === account
      )) ??
    [];
  const { cancelSellOrder, cancelSellOrderState } = useLCTokenNFTCancelSellOffer(address);

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

  return (
    <>
      {sellOrders && (
        <>
          {sellOrders.map((sellOrder: any, index: any) => (
            <Fragment key={index}>
              <Group justify="space-between">
                <NumberFormatter
                  value={Number(sellOrders[0].balance) / 10 ** 18}
                  decimalScale={8}
                  suffix=" ETH"
                />
                <Button
                  id={`cancelSellOrder_${index}`}
                  size="xs"
                  radius="xl"
                  p={10}
                  onClick={() => {
                    setShowLoader(true);
                    cancelSellOrder(sellOrder.orderId);
                  }}
                >
                  Cancel
                </Button>
              </Group>
            </Fragment>
          ))}
          {showLoader && <Loader />}
        </>
      )}
    </>
  );
};
