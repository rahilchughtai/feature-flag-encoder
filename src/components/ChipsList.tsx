import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { FeatureFlagChipData } from '../models/featureFlagModel';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface ChipsListProps {
  setChipData: React.Dispatch<React.SetStateAction<FeatureFlagChipData[]>>;
  chipData: FeatureFlagChipData[];
}

export default function ChipsList({ setChipData, chipData }: ChipsListProps) {

  const handleDelete = (chipToDelete: FeatureFlagChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleClick = (chipToToggle: FeatureFlagChipData) => {
    setChipData((chips) =>
      chips.map((flag) =>
        flag.key === chipToToggle.key ? { ...flag, enabled: !flag.enabled } : flag
      )
    );

  }

  return (
    chipData.length > 0 &&
    <Paper
      sx={{
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: '1em',
        m: '1em auto',
      }}
      component="ul"
    >
      {chipData.map((data) => {
        return (
          <ListItem key={data.key}>
            <Chip
              color={data.enabled ? 'success' : 'error'}
              onClick={() => handleClick(data)}
              label={data.label}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}