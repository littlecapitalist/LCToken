import { useState, useEffect } from 'react';
import { Button, Grid, TextInput } from '@mantine/core';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Loader } from '../Loader/Loader';
import { useLCTokenNFTBuyOffer } from '../../hooks/LCTokenNFT/LCTokenNFTTradeFunctions';

export const LCTokenNFTBuyOrder = ({ address, id }: { address: string; id: number }) => {
  const { placeBuyOrder, buyOfferState } = useLCTokenNFTBuyOffer(address);
  const [buyShareETH, setBuyShareETH] = useState(0);
  const [canUpdate, setCanUpdate] = useState(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    if (canUpdate === true) {
      setBuyShareETH(0);
    }
  }, []);

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
            id="artWorkBuyShareOfferETH"
            label="Share ETH"
            type="number"
            variant="filled"
            value={buyShareETH}
            onChange={(event) => {
              setBuyShareETH(Number(event?.target.value));
              setCanUpdate(false);
            }}
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
              placeBuyOrder(id, shareETH);
              setCanUpdate(false);
            }}
          >
            Make Offer
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
};
