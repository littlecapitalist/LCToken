import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';
import { Button, Grid, Text, TextInput, Title } from '@mantine/core';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { LCTokenGetSharePrice } from '../../hooks/LCToken/LCTokenViewByAddress';
import {
  LCTokenShareOwn,
  LCTokenShareTradeSellOfferApprove,
} from '../../hooks/LCToken/LCTokenShareTradeFunction';
import { Loader } from '../Loader/Loader';

export const LCTokenTradeSell = ({ address }: { address: string }) => {
  const { account } = useEthers();
  const artworkShareOwn = LCTokenShareOwn(address, account) || 0;
  const [sellShareQty, setSellShareQty] = useState(1);
  const [sellShareETH, setSellShareETH] = useState(0);
  const [canUpdate, setCanUpdate] = useState(true);
  const [sellShareETHTotal, setSellShareETHTotal] = useState(0);
  const { approveShares, ApproveSharesState, sellOfferState } = LCTokenShareTradeSellOfferApprove(
    address,
    sellShareQty,
    sellShareETH
  );

  const artWorkSharePrice = LCTokenGetSharePrice(address) || 0;

  useEffect(() => {
    if (canUpdate === true) {
      setSellShareETH(artWorkSharePrice / 1e18);
      setSellShareETHTotal(artWorkSharePrice / 1e18);
    }
  }, [artWorkSharePrice]);

  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    if (ApproveSharesState.status === 'Exception') {
      mantineNotifications.show({
        message: ApproveSharesState.errorMessage || 'TRANSACTION FAILED',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
      setCanUpdate(true);
    }
    if (ApproveSharesState.status === 'Success') {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
      setCanUpdate(true);
    }

    if (sellOfferState.status === 'Exception') {
      mantineNotifications.show({
        message: sellOfferState.errorMessage || 'TRANSACTION FAILED',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
      setCanUpdate(true);
    }
    if (sellOfferState.status === 'Success') {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
      setCanUpdate(true);
    }
  }, [sellOfferState, ApproveSharesState]);

  return (
    <>
      {showLoader && <Loader />}
      {artworkShareOwn === 0 ? (
        <>
          <Text>You have no shares to trade.</Text>
        </>
      ) : (
        <>
          <Title order={4}>Share Sell Order</Title>
          <Text>
            <strong id="availableShares">{Number(artworkShareOwn)}</strong> available Shares
          </Text>

          <Grid>
            <Grid.Col span={12}>
              <TextInput
                id="artWorkSellShareOfferQTY"
                label="Share Qty"
                type="number"
                variant="filled"
                value={sellShareQty}
                onChange={(event) => {
                  setSellShareQty(Number(event?.target.value));
                  setSellShareETHTotal(Number(event?.target.value) * sellShareETH);
                  setCanUpdate(false);
                }}
              />
              <TextInput
                id="artWorkSellShareOfferETH"
                label="Share ETH"
                type="number"
                variant="filled"
                value={sellShareETH}
                onChange={(event) => {
                  setSellShareETH(Number(event?.target.value));
                  setSellShareETHTotal(sellShareQty * Number(event?.target.value));
                  setCanUpdate(false);
                }}
              />
              <TextInput
                id="artWorkSellTotalETH"
                label="Total Eth"
                readOnly
                value={sellShareETHTotal}
                variant="filled"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Button
                variant="contained"
                id="approveSharesSellOrder"
                color="primary"
                onClick={() => {
                  setShowLoader(true);
                  approveShares(sellShareQty);
                  setCanUpdate(false);
                }}
              >
                Approve &amp; Make Share Sell Order
              </Button>
            </Grid.Col>
          </Grid>
        </>
      )}
    </>
  );
};
