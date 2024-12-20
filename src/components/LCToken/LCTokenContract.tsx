import React, { useState, useEffect } from 'react';

import { useEthers, useNotifications } from '@usedapp/core';
import {
  Button,
  Text,
  TextInput,
  Switch,
  Collapse,
  Box,
  Group,
  Title,
  Tabs,
  Alert,
} from '@mantine/core';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { IconCaretDown, IconCaretRight, IconCheck, IconX } from '@tabler/icons-react';

import { useDisclosure } from '@mantine/hooks';
import { LCTokenMakeOffer } from '../../hooks/LCToken/LCTokenMakeOfferByAddress';
import {
  LCTokenOwnerSetForSale,
  LCTokenOwnerSetMetaData,
  LCTokenOwnerSetNotForSale,
  LCTokenReleaseTokens,
} from '../../hooks/LCToken/LCTokenOwnerByAddress';
import { LCTokenInterface } from '../../hooks/LCToken/LCToken';
import { Loader } from '../Loader/Loader';

export interface LCTokenContractProps {
  address: string;
  token: LCTokenInterface;
}

export const LCTokenContract = ({ address, token }: LCTokenContractProps) => {
  const { account } = useEthers();
  const { notifications } = useNotifications();

  const { SetLCTokenForSale, lcTokenSetForSaleState } = LCTokenOwnerSetForSale(address);
  const { SetLCTokenNotForSale, lcTokenSetNotForSaleState } = LCTokenOwnerSetNotForSale(address);
  const { lcTokenReleaseTokens, lcTokenReleaseTokensState } = LCTokenReleaseTokens(address);
  const { SetLCTokenMetaData, lcTokenSetMetaDataState } = LCTokenOwnerSetMetaData(address);

  const lcTokenPrice = token.getContractSalePrice || {};
  const lcTokenForSale = token.isForSale;
  const lcTokenOwners = token.owners || [];

  //const lcTokenPriceETH = lcTokenPrice / 1e18;
  const { lcTokenMakeOffer, lcTokenMakeOfferState } = LCTokenMakeOffer(address);

  const [lcTokenReleaseTokensQty, setLCTokenReleaseTokenQty] = useState(0);
  const [lcTokenReleaseTokensAddress, setLCTokenReleaseTokenAddress] = useState(
    account?.toString() ?? ''
  );

  const [lcTokenMetData, setLCTokenMetaData] = useState(token.tokenMeta?.mediaDataPackURI ?? '');

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [opened, { toggle }] = useDisclosure(false);
  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === 'transactionSucceed' &&
          notification.transactionName === 'Set Meta Data'
      ).length > 0
    ) {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
    }
    if (
      notifications.filter(
        (notification) =>
          notification.type === 'transactionFailed' &&
          notification.transactionName === 'Set Meta Data'
      ).length > 0
    ) {
      mantineNotifications.show({
        message: 'Transaction Failed',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
    }
    if (lcTokenSetMetaDataState.status === 'Exception') {
      setShowLoader(false);
      mantineNotifications.show({
        message: lcTokenSetMetaDataState.errorMessage || '',
        color: 'red',
        icon: <IconX />,
      });
    }

    if (
      notifications.filter(
        (notification) =>
          notification.type === 'transactionSucceed' &&
          notification.transactionName === 'Set FOR SALE'
      ).length > 0
    ) {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
    }
    if (
      notifications.filter(
        (notification) =>
          notification.type === 'transactionFailed' &&
          notification.transactionName === 'Set FOR SALE'
      ).length > 0
    ) {
      mantineNotifications.show({
        message: 'Transaction Failed',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
    }
    if (lcTokenSetForSaleState.status === 'Exception') {
      setShowLoader(false);
      mantineNotifications.show({
        message: lcTokenSetForSaleState.errorMessage || '',
        color: 'red',
        icon: <IconX />,
      });
    }

    if (lcTokenSetNotForSaleState.status === 'Exception') {
      setShowLoader(false);
      mantineNotifications.show({
        message: lcTokenSetNotForSaleState.errorMessage || '',
        color: 'red',
        icon: <IconX />,
      });
    }

    if (
      notifications.filter(
        (notification) =>
          notification.type === 'transactionSucceed' &&
          notification.transactionName === 'Release Tokens'
      ).length > 0
    ) {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
    }
    if (
      notifications.filter(
        (notification) =>
          notification.type === 'transactionFailed' &&
          notification.transactionName === 'Release Tokens'
      ).length > 0
    ) {
      mantineNotifications.show({
        message: 'Transaction Failed',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
    }
    if (lcTokenReleaseTokensState.status === 'Exception') {
      setShowLoader(false);
      mantineNotifications.show({
        message: lcTokenReleaseTokensState.errorMessage || '',
        color: 'red',
        icon: <IconX />,
      });
    }

    if (
      notifications.filter(
        (notification) =>
          notification.type === 'transactionSucceed' &&
          notification.transactionName === 'Purchase Offer'
      ).length > 0
    ) {
      mantineNotifications.show({
        message: 'TRANSACTION APPROVED',
        color: 'green',
        icon: <IconCheck />,
      });
      setShowLoader(false);
    }
    if (
      notifications.filter(
        (notification) =>
          notification.type === 'transactionFailed' &&
          notification.transactionName === 'Purchase Offer'
      ).length > 0
    ) {
      mantineNotifications.show({
        message: 'Transaction Failed',
        color: 'red',
        icon: <IconX />,
      });
      setShowLoader(false);
    }
    if (lcTokenMakeOfferState.status === 'Exception') {
      setShowLoader(false);
      mantineNotifications.show({
        message: lcTokenMakeOfferState.errorMessage || '',
        color: 'red',
        icon: <IconX />,
      });
    }
  }, [
    notifications,
    lcTokenSetForSaleState,
    lcTokenSetNotForSaleState,
    lcTokenReleaseTokensState,
    lcTokenMakeOfferState,
    lcTokenSetMetaDataState,
  ]);

  /// OWNERS
  const _lcTokenOwners = [];
  let isOwner = false;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < lcTokenOwners.length; i++) {
    if (account?.toUpperCase() === lcTokenOwners[i].toUpperCase()) {
      if (i === lcTokenOwners.length - 1) {
        isOwner = true;
      }
    }
    _lcTokenOwners.push(<li>{lcTokenOwners[i]}</li>);
  }

  return (
    <>
      {!isOwner && lcTokenForSale && (
        <Alert color="gray" mb={20}>
          <Button
            id="purchaseLCToken"
            variant="contained"
            color="primary"
            onClick={() => {
              setShowLoader(true);
              lcTokenMakeOffer({ value: lcTokenPrice });
            }}
          >
            Purchase Contract
          </Button>
        </Alert>
      )}

      {isOwner && (
        <>
          <Alert color="gray" mb={20}>
            <Box maw={400} mx="auto">
              <Group justify="space-between" mb={5} onClick={toggle}>
                <Title order={4}>Contract Administration</Title>{' '}
                {opened ? <IconCaretDown /> : <IconCaretRight />}
              </Group>

              <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear">
                <Tabs defaultValue="sale">
                  <Tabs.List>
                    <Tabs.Tab value="sale">Sell Contract</Tabs.Tab>
                    <Tabs.Tab value="tokens">Release Tokens</Tabs.Tab>
                    <Tabs.Tab value="metadata">Metadata</Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="sale" mt={20}>
                    <Text>
                      Set For Sale
                      <Switch
                        id="lcTokenForSale"
                        checked={lcTokenForSale}
                        onChange={(event: { target: { checked: boolean } }) => {
                          setShowLoader(true);
                          if (event?.target.checked === true) {
                            SetLCTokenForSale();
                          } else {
                            SetLCTokenNotForSale();
                          }
                        }}
                      />
                    </Text>
                  </Tabs.Panel>

                  <Tabs.Panel value="tokens" mt={20}>
                    <Text>Release Tokens</Text>
                    <div>
                      <TextInput
                        label="Qty"
                        id="lcTokenReleaseTokensQty"
                        type="number"
                        variant="filled"
                        value={lcTokenReleaseTokensQty}
                        onChange={(event: { target: { value: any } }) => {
                          setLCTokenReleaseTokenQty(Number(event?.target.value));
                        }}
                      />
                    </div>
                    <div>
                      <TextInput
                        label="Address"
                        variant="filled"
                        value={lcTokenReleaseTokensAddress}
                        onChange={(event) => {
                          setLCTokenReleaseTokenAddress(event?.target.value);
                        }}
                      />
                    </div>
                    <Button
                      mt={20}
                      id="releaseTokens"
                      variant="contained"
                      onClick={() => {
                        setShowLoader(true);
                        lcTokenReleaseTokens(lcTokenReleaseTokensAddress, lcTokenReleaseTokensQty);
                      }}
                    >
                      Release Tokens
                    </Button>
                  </Tabs.Panel>

                  <Tabs.Panel value="metadata" mt={20}>
                    <div>
                      <TextInput
                        label="URL"
                        variant="filled"
                        placeholder="https://your.url/to/your/metadata.json"
                        value={lcTokenMetData}
                        onChange={(event) => {
                          setLCTokenMetaData(event?.target.value);
                        }}
                      />
                    </div>
                    <Button
                      mt={20}
                      id="releaseTokens"
                      variant="contained"
                      onClick={() => {
                        setShowLoader(true);
                        SetLCTokenMetaData(lcTokenMetData);
                      }}
                    >
                      Update Meta Data Url
                    </Button>
                  </Tabs.Panel>
                </Tabs>
              </Collapse>
            </Box>
          </Alert>
          {showLoader && <Loader />}
        </>
      )}
    </>
  );
};
