import { useEffect, useState } from 'react';
import { Button, Grid, TextInput } from '@mantine/core';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

import { Loader } from '../Loader/Loader';
import { useLCTokenNFTTradeSellOfferApprove } from '../../hooks/LCTokenNFT/LCTokenNFTTradeFunctions';

export const LCTokenNFTSellOrder = ({ address, id }: { address: string; id: number }) => {
  const [sellShareETH, setSellShareETH] = useState(0);
  const { approveNFT, ApproveNFTState, sellOfferState } = useLCTokenNFTTradeSellOfferApprove(
    address,
    id,
    sellShareETH
  );

  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    if (ApproveNFTState.status === 'Exception') {
      mantineNotifications.show({
        message: ApproveNFTState.errorMessage || 'TRANSACTION FAILED',
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
        message: sellOfferState.errorMessage || 'TRANSACTION FAILED',
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
      {showLoader && <Loader />}

      <Grid>
        <Grid.Col span={12}>
          <TextInput
            id="lcTokenNFTSellShareOfferETH"
            label="NFT ETH Value"
            type="number"
            variant="filled"
            value={sellShareETH}
            onChange={(event) => {
              setSellShareETH(Number(event?.target.value));
            }}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button
            variant="contained"
            id="approveSharesSellOrder"
            color="primary"
            onClick={() => {
              setShowLoader(true);
              approveNFT(id);
            }}
          >
            Approve &amp; Set NFT For Sale
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
};
