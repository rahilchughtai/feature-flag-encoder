import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { FeatureFlagChipData } from '../../models/featureFlagModel';
import FlagChip from './FlagChip';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface ChipsListProps {
  chipData: FeatureFlagChipData[];
  onChipClick: (chipKey: number) => void,
  onChipDelete: (chipKey: number) => void,
}

export default function ChipsList({ chipData, onChipClick, onChipDelete }: ChipsListProps) {

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
            <FlagChip
              data={data}
              onClick={() => onChipClick(data.key)}
              onDelete={() => onChipDelete(data.key)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}