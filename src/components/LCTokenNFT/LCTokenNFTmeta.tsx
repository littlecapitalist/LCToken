/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-plusplus */
import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  Accordion,
  Badge,
  Grid,
  Group,
  Image,
  NavLink,
  NumberFormatter,
  Stack,
  Text,
} from '@mantine/core';
import { verifiedFetch } from '@helia/verified-fetch';
import { IconFile } from '@tabler/icons-react';
import { useEthers } from '@usedapp/core';
import { LCTokenNFTInterface } from '../../hooks/LCTokenNFT/LCTokenNFT';
import { LCTokenNFTBuy } from './LCTokenNFTBuy';
import { LCTokenNFTSell } from './LCTokenNFTSell';
import {
  LCTokenNFTBuyOrdersGET,
  LCTokenNFTSellOrdersGET,
} from '../../hooks/LCTokenNFT/LCTokenNFTTradeFunctions';
import { LCTokenNFTSellOrders } from './LCTokenNFTSellOrders';

const TokenDetails = ({
  id,
  address,
  token,
  owner,
  sellOrders,
  buyOrders,
}: {
  id: number;
  address: string;
  token: LCTokenNFTInterface;
  owner: boolean;
  sellOrders: {
    owner: string;
    tokenId: number;
    balance: number;
    orderId: number;
  }[];
  buyOrders: {
    owner: string;
    tokenId: number;
    balance: number;
    orderId: number;
  }[];
}) => {
  const { account } = useEthers();
  const [image, setImage] = useState<string>();
  const [video, setVideo] = useState<string>();
  const [audio, setAudio] = useState<string>();
  const [file, setFile] = useState<string>();
  const [metaJson, setMetaJson] = useState<any>();
  const getMeta = async () => {
    const responce = await verifiedFetch(`${token.meta}/${id}.json`);
    const json = await responce.json();
    setMetaJson(json);
    if (json.image) setImage(URL.createObjectURL(await (await verifiedFetch(json.image)).blob()));
    if (json.video) setVideo(URL.createObjectURL(await (await verifiedFetch(json.video)).blob()));
    if (json.audio) setAudio(URL.createObjectURL(await (await verifiedFetch(json.audio)).blob()));
    if (json.file) setFile(URL.createObjectURL(await (await verifiedFetch(json.file)).blob()));
  };
  useEffect(() => {
    getMeta();
  }, []);
  let forSale = false;
  if (sellOrders.length > 0) {
    forSale = true;
  }
  const sOrders =
    (sellOrders && sellOrders.filter((order: { tokenId: number }) => order.tokenId === id)) ?? [];
  return (
    <>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <Stack bg="gray" gap={0}>
          {image && <Image src={image} alt="Image" />}
          {video && <video src={image} controls />}
          {audio && <audio src={image} controls />}
          {file && <NavLink href={file} target="_blank" leftSection={<IconFile />} label="File" />}
          <Text p={10}>
            {token.name} #{id}
          </Text>
          <Group justify="space-between">
            {owner && (
              <Badge bg="grape" m={10} mt={0}>
                Owner
              </Badge>
            )}
            {forSale && owner && (
              <>
                <Text mb={10} fz="sm">
                  <NumberFormatter
                    value={Number(sOrders[0].balance) / 10 ** 18}
                    decimalScale={8}
                    suffix=" ETH"
                  />
                </Text>
                <Badge bg="green" m={10} mt={0}>
                  For Sale
                </Badge>
              </>
            )}
          </Group>
          {!owner && <LCTokenNFTSellOrders address={address} id={id} orders={sellOrders} />}

          <Accordion variant="contained" bg="dark">
            <Accordion.Item value="description">
              <Accordion.Control>Description</Accordion.Control>
              <Accordion.Panel>
                <Text>{metaJson?.description}</Text>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="buy">
              <Accordion.Control>Buy Offers</Accordion.Control>
              <Accordion.Panel>
                <LCTokenNFTBuy address={address} id={id} owner={owner} buyOrders={buyOrders} />
              </Accordion.Panel>
            </Accordion.Item>
            {(owner || sellOrders.find((order) => order.owner === account)) && (
              <Accordion.Item value="sell">
                <Accordion.Control>Sell</Accordion.Control>
                <Accordion.Panel>
                  <LCTokenNFTSell address={address} id={id} sellOrders={sellOrders} />
                </Accordion.Panel>
              </Accordion.Item>
            )}
          </Accordion>
        </Stack>
      </Grid.Col>
    </>
  );
};

export const LCTokenNFTmeta = ({
  address,
  token,
  owned,
}: {
  address: string;
  token: LCTokenNFTInterface;
  owned: any;
}) => {
  const { account } = useEthers();
  const sellOrders = LCTokenNFTSellOrdersGET(address);
  const sOrders = useMemo(() => {
    const orders = [];
    if (sellOrders && sellOrders[0]) {
      for (const i in sellOrders[0]) {
        orders.push({
          owner: sellOrders[0][i],
          tokenId: Number(sellOrders[1][i]),
          balance: Number(sellOrders[2][i]),
          orderId: sellOrders[3][i],
        });
      }
    }
    return orders;
  }, [sellOrders]);
  const buyOrders = LCTokenNFTBuyOrdersGET(address);
  const bOrders = useMemo(() => {
    const orders = [];
    if (buyOrders && buyOrders[0]) {
      for (const i in buyOrders[0]) {
        orders.push({
          owner: buyOrders[0][i],
          tokenId: Number(buyOrders[1][i]),
          balance: Number(buyOrders[2][i]),
          orderId: buyOrders[3][i],
        });
      }
    }
    return orders;
  }, [buyOrders]);

  const tokens = useMemo(() => {
    const nfts = [];
    for (let i: number = 0; i < token.totalSupply; i++) {
      let own = owned.has(i.toString());
      if (sOrders.find((order) => order.owner === account)) {
        own = true;
      }
      const nft = (
        <TokenDetails
          address={address}
          id={i}
          token={token}
          owner={own}
          buyOrders={bOrders.filter((order) => order.tokenId === i)}
          sellOrders={sOrders.filter((order) => order.tokenId === i)}
        />
      );
      nfts.push(nft);
    }
    return nfts;
  }, [token]);

  return (
    <Grid w="100%">
      {tokens.map((nft, index) => (
        <Fragment key={`${index}nft`}>{nft}</Fragment>
      ))}
    </Grid>
  );
};
