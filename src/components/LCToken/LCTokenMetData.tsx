/* eslint-disable jsx-a11y/media-has-caption */
import { Image, NavLink, Stack, Text } from '@mantine/core';
import { IconArchive, IconFile, IconPdf } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export const LCTokenMetaData = ({ url }: { url: string | undefined }) => {
  const [error, setError] = useState<boolean>(false);
  const [metaData, setMetaData] = useState<any>();

  const requestOptions = {
    method: 'GET',
  };
  const fetchMetaData = async () => {
    if (url) {
      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        setMetaData(data);
      } catch (e) {
        setError(true);
      }
    }
  };
  useEffect(() => {
    fetchMetaData();
  }, [url]);
  const parseMeta = () => {
    const metaOut = [];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in metaData) {
      if (metaData[key].text) {
        const mdata = metaData[key].text;
        if (mdata.type === 'description') {
          metaOut.push(<Text mt={20}>{mdata.text}</Text>);
        }
      }

      if (metaData[key].file) {
        const mdata = metaData[key].file;
        if (mdata.type === 'image') {
          if (mdata.src) {
            metaOut.push(
              <>
                <Image src={mdata.src} alt={mdata.title ?? 'Image'} mt={20} />
                {mdata.title && <Text>{mdata.title}</Text>}
              </>
            );
          }
        } else if (mdata.type === 'audio') {
          if (mdata.src) {
            metaOut.push(
              <>
                <audio src={mdata.src} controls style={{ marginTop: '20px' }} />
                {mdata.title && <Text>{mdata.title}</Text>}
              </>
            );
          }
        } else if (mdata.type === 'video') {
          if (mdata.src) {
            metaOut.push(
              <>
                <video src={mdata.src} controls style={{ marginTop: '20px' }} />
                {mdata.title && <Text>{mdata.title}</Text>}
              </>
            );
          }
        } else if (mdata.type === 'pdf') {
          if (mdata.src) {
            metaOut.push(
              <NavLink
                href={mdata.src}
                target="_blank"
                leftSection={<IconPdf />}
                label={mdata.title ?? 'PDF'}
              />
            );
          }
        } else if (mdata.type === 'archive') {
          if (mdata.src) {
            metaOut.push(
              <NavLink
                href={mdata.src}
                target="_blank"
                leftSection={<IconArchive />}
                label={mdata.title ?? 'archive'}
              />
            );
          }
        } else if (mdata.src) {
          metaOut.push(
            <NavLink
              href={mdata.src}
              target="_blank"
              leftSection={<IconFile />}
              label={mdata.title ?? 'File'}
            />
          );
        }
      }
    }
    return metaOut;
  };
  if (!url || url === '') {
    return null;
  }
  return (
    <>
      {error && <>Error fetching MetaData!</>}
      {metaData && <Stack> {parseMeta().map((obj) => obj)}</Stack>}
    </>
  );
};
