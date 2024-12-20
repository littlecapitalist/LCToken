import { useState, useEffect } from 'react';
import { Button, Grid, TextInput } from '@mantine/core';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { LCTokenGetSharePrice } from '../../hooks/LCToken/LCTokenViewByAddress';
import { LCTokenShareTradeBuyOffer } from '../../hooks/LCToken/LCTokenShareTradeFunction';
import { Loader } from '../Loader/Loader';

export const LCTokenTradeBuy = ({ address }: { address: string }) => {
  const { placeBuyOrder, buyOfferState } = LCTokenShareTradeBuyOffer(address);
  const [buyShareQty, setBuyShareQty] = useState(1);
  const [buyShareETH, setBuyShareETH] = useState(0);
  const [buyShareETHTotal, setBuyShareETHTotal] = useState(0);
  const [canUpdate, setCanUpdate] = useState(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const artWorkSharePrice = LCTokenGetSharePrice(address) || 0;

  useEffect(() => {
    if (canUpdate === true) {
      setBuyShareETH(artWorkSharePrice / 1e18);
      setBuyShareETHTotal(artWorkSharePrice / 1e18);
    }
  }, [artWorkSharePrice]);

  useEffect(() => {
    if (buyOfferState.status === 'Exception') {
      mantineNotifications.show({
        message: buyOfferState.errorMessage || 'TRANSACTION FAILED',
        color: 'red',
        icon: <IconX />,
      });
      setCanUpdate(true);
    }
    if (buyOfferState.status === 'Success') {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
      setCanUpdate(true);
    }
  }, [buyOfferState]);

  return (
    <>
      {showLoader && <Loader />}
      <Grid>
        <Grid.Col span={12}>
          <TextInput
            id="artWorkBuyShareOfferQTY"
            label="Share Qty"
            type="number"
            variant="filled"
            value={buyShareQty}
            onChange={(event) => {
              setBuyShareQty(Number(event?.target.value));
              setBuyShareETHTotal(Number(event?.target.value) * buyShareETH);
              setCanUpdate(false);
            }}
          />
          <TextInput
            id="artWorkBuyShareOfferETH"
            label="Share ETH"
            type="number"
            variant="filled"
            value={buyShareETH}
            onChange={(event) => {
              setBuyShareETH(Number(event?.target.value));
              setBuyShareETHTotal(buyShareQty * Number(event?.target.value));
              setCanUpdate(false);
            }}
          />
          <TextInput
            id="artWorkBuyTotalETH"
            label="Total Eth"
            readOnly
            variant="filled"
            value={buyShareETHTotal}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button
            id="placeBuyOrder"
            variant="contained"
            color="primary"
            onClick={() => {
              setShowLoader(true);
              const shareETH = buyShareETH * 1e18;
              placeBuyOrder(buyShareQty, shareETH);
              setCanUpdate(false);
            }}
          >
            Make Share Buy Order
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
};

// export const LCTokenShareOwnerBuyOrders = ({ address }: { address: string }) => <></>;

// export const LCTokenShareOwnerSellOrders = ({ address }: { address: string }) => <></>;
