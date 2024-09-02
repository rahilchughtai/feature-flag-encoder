import { useState } from 'react';
import './App.css';
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material';
import ChipsList from './components/ChipsList';
import { FeatureFlagChipData, FeatureFlagEncoding } from './models/featureFlagModel';
import FeatureFlagForm from './components/FeatureFlagForm';
import EncodedDataDisplay from './components/EncodedDataDisplay';
import { useLocalStorage } from 'usehooks-ts';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#18ffff',
    },
    secondary: {
      main: '#f50057',
    },
  },
});





function App() {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlagChipData[]>([]);
  const [flagText, setFlagText] = useState('');
  const [encodingTitle, setEncodingTitle] = useState('');
  const [encodingList, setEncodingList] = useLocalStorage<FeatureFlagEncoding[]>('encodingList', []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography fontWeight='bold' style={{ marginTop: '1em', marginBottom: '1em' }} color={'info'} align="center" variant='h3'>
        Feature Flags Encoding Tool
      </Typography>

      <ChipsList chipData={featureFlags} setChipData={setFeatureFlags} />

      <FeatureFlagForm
        encodingTitle={encodingTitle} setEncodingTitle={setEncodingTitle}
        setFlagText={setFlagText} setFeatureFlags={setFeatureFlags}
        setEncodingList={setEncodingList} flagText={flagText} featureFlags={featureFlags} />


      <EncodedDataDisplay setEncodingList={setEncodingList} encodingList={encodingList} />


    </ThemeProvider>
  );
}

export default App;
