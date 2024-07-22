import {
  Box,
  Heading,
  Image,
} from 'native-base';
import logoPng from '../assets/logo.png';

export function Logo() {
  return (
    <Box flexDirection="row" alignItems="center" gap="2">
      <Image w="12" h="12" source={logoPng} />
      <Heading>Sharingam</Heading>
    </Box>
  );
}
