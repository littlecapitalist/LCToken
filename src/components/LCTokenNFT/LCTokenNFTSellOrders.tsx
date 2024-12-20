import { useEffect, useState } from 'react';
import { Button, Group, NumberFormatter } from '@mantine/core';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Loader } from '../Loader/Loader';
import { useLCTokenNFTBuyOffer } from '../../hooks/LCTokenNFT/LCTokenNFTTradeFunctions';

export const LCTokenNFTSellOrders = ({
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
  const sellOrders =
    (orders && orders.filter((order: { tokenId: number }) => order.tokenId === id)) ?? [];
  const { placeBuyOrder, buyOfferState } = useLCTokenNFTBuyOffer(address);

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
  return (
    <>
      {sellOrders.length > 0 && (
        <>
          <Group justify="space-between" p={10}>
            <NumberFormatter
              value={Number(sellOrders[0].balance) / 10 ** 18}
              decimalScale={8}
              suffix=" ETH"
            />

            <Button
              size="xs"
              onClick={() => {
                setShowLoader(true);
                placeBuyOrder(Number(sellOrders[0].tokenId), Number(sellOrders[0].balance));
              }}
            >
              Buy NFT
            </Button>
          </Group>

          {showLoader && <Loader />}
        </>
      )}
    </>
  );
};
