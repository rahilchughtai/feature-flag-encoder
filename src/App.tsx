import { useState } from 'react';
import './App.css';
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material';
import ChipsList from './components/chips/ChipsList';
import { FeatureFlagChipData, FeatureFlagEncoding } from './models/featureFlagModel';
import FeatureFlagForm from './components/FeatureFlagForm';
import EncodedDataDisplay from './components/EncodedDataDisplay';
import { useLocalStorage } from 'usehooks-ts';
import { encodeFlags } from './utils/encoder';

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
  const [encodingTitle, setEncodingTitle] = useState('');
  const [encodingList, setEncodingList] = useLocalStorage<FeatureFlagEncoding[]>('encodingList', []);

  const handleEncodingTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setEncodingTitle(val);
  }


  const handleDelete = (chipKey: number) => {
    setFeatureFlags((chips) => chips.filter((chip) => chip.key !== chipKey));
  };

  const handleClick = (chipKey: number) => {
    setFeatureFlags((chips) =>
      chips.map((flag) =>
        flag.key === chipKey ? { ...flag, enabled: !flag.enabled } : flag
      )
    );
  }

  const genereateEncoding = () => {
    if (featureFlags.length === 0) {
      return;
    }
    const featureFlagsCopy = [...featureFlags];
    const encoding = encodeFlags(featureFlagsCopy);
    setEncodingList((eList) => [{ encodingTitle, encoding, featureFlags: featureFlagsCopy }, ...eList]);
    setFeatureFlags([]);
    setEncodingTitle('');
  }

  const addFeatureFlag = (flagText: string) => {
    setFeatureFlags(flags => [...flags, {
      key: flags.length,
      label: flagText,
      enabled: true
    }]);
  }



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography fontWeight='bold' style={{ marginTop: '1em', marginBottom: '1em' }} color={'info'} align="center" variant='h3'>
        Feature Flags Encoding Tool
      </Typography>


      <ChipsList chipData={featureFlags} onChipClick={(key) => handleClick(key)} onChipDelete={(key) => handleDelete(key)} />
      <FeatureFlagForm>
        <FeatureFlagForm.FlagTextField
          onAddFeatureFlag={addFeatureFlag}
        />
        <FeatureFlagForm.EncodingTextField
          encodingTitle={encodingTitle}
          onEncodingTitleChange={handleEncodingTitleChange}
        />
        <FeatureFlagForm.AddButton
          onAddFeatureFlag={addFeatureFlag}
        />
        <FeatureFlagForm.EncodeButton
          onGenereateEncoding={genereateEncoding}
        />
      </FeatureFlagForm>

      <EncodedDataDisplay>
        <EncodedDataDisplay.Title encodingList={encodingList} />
        <EncodedDataDisplay.ListItem encodingList={encodingList} setEncodingList={setEncodingList} />
      </EncodedDataDisplay>

    </ThemeProvider>
  );
}

export default App;
