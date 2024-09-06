import { Paper, Stack, TextField, Typography, IconButton, Tooltip, Modal, Box } from '@mui/material'
import React, { useContext, useState } from 'react'
import { FeatureFlagEncoding } from '../models/featureFlagModel';
import { encodeFlags } from '../utils/encoder';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FlagChip from './chips/FlagChip';
import { AddCircleOutlined } from '@mui/icons-material';
import FeatureFlagForm from './FeatureFlagForm';
import ChipsList from './chips/ChipsList';
import { SnackbarContext } from '../context/snackbar';

interface EncodingListProps {
    encodingList: FeatureFlagEncoding[],
    setEncodingList: React.Dispatch<React.SetStateAction<FeatureFlagEncoding[]>>
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function EncodedDataListItem({ encodingList, setEncodingList }: EncodingListProps) {

    const { setSnackbarOpen } = useContext(SnackbarContext)
    const [modelOpen, setModelOpen] = useState(false)
    const [clickedEncodingIndex, setClickedEncoding] = useState(0);
    const clickedEncodingFeatureFlags = encodingList.length === 0 ? [] : encodingList[clickedEncodingIndex].featureFlags

    const handleMoveDown = (index: number) => {
        if (index === encodingList.length - 1) {
            return;
        }
        const updatedList = [...encodingList];
        const temp = updatedList[index + 1];
        updatedList[index + 1] = updatedList[index];
        updatedList[index] = temp;
        setEncodingList(updatedList);
    }


    const handleCopy = async (text: string) => {
        if (!text) { return }
        await navigator.clipboard.writeText(text);
        setSnackbarOpen(true)
    };


    const handleMoveUp = (index: number) => {
        if (index === 0) {
            return;
        }
        const updatedList = [...encodingList];
        const temp = updatedList[index - 1];
        updatedList[index - 1] = updatedList[index];
        updatedList[index] = temp;
        setEncodingList(updatedList);
    }
    const handleDelete = (index: number) => {
        const updatedList = encodingList.filter((_, i) => i !== index);
        setEncodingList(updatedList);
    }
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const updatedList = encodingList.map((encoding, i) => {
            if (i === index) {
                return { ...encoding, encodingTitle: event.target.value }
            }
            return encoding
        });
        setEncodingList(updatedList);
    }

    const handleChipDelete = (key: number, index: number) => {
        const updatedList = encodingList.map((encoding, i) => {
            if (i === index) {
                const updatedFlags = encoding.featureFlags.filter(flag => flag.key !== key);
                return { encoding: encodeFlags(updatedFlags), featureFlags: updatedFlags, encodingTitle: encoding.encodingTitle }
            }
            return encoding
        });
        setEncodingList(updatedList);
    }

    const handleAddFlag = (index: number) => {
        setClickedEncoding(index)
        setModelOpen(true)
    }


    const onAddFlagEvent = (flagText: string, index: number) => {
        const updatedList = [...encodingList];
        const key = updatedList[index].featureFlags.length
        updatedList[index].featureFlags.push({ enabled: true, key, label: flagText })
        updatedList[index].encoding = encodeFlags(updatedList[index].featureFlags)
        setEncodingList(updatedList)


    }

    const handleChipClick = (key: number, index: number) => {
        console.debug([key, index])
        const updatedList = encodingList.map((encoding, i) => {
            if (i === index) {
                const updatedFlags = encoding.featureFlags.map(flag => {
                    if (flag.key === key) {
                        return { ...flag, enabled: !flag.enabled }
                    }
                    return flag
                })
                return { encoding: encodeFlags(updatedFlags), featureFlags: updatedFlags, encodingTitle: encoding.encodingTitle }
            }
            return encoding
        });
        setEncodingList(updatedList);
    }
    return (
        <>
            {encodingList.map((encoding, index) => {
                return (
                    <Grid key={'encoding' + index} justifyContent='center' alignItems='center' sx={{ padding: '1.3em', border: 0.1 }} margin='1.8em auto' maxWidth='65%' container spacing={4}>
                        <Grid size={{ md: 12 }}>
                            <Stack display='flex' direction="row" justifyContent='flex-end' spacing={2}>
                                <TextField
                                    variant='standard'
                                    sx={{ width: '50%' }}
                                    fullWidth
                                    style={{ marginRight: 'auto' }}
                                    onChange={(e) => handleTitleChange(e, index)}
                                    value={encoding.encodingTitle || ''}
                                    placeholder='Enter Title'
                                />
                                <IconButton onClick={() => handleMoveUp(index)} >
                                    <ArrowUpwardIcon color='info' />
                                </IconButton>
                                <IconButton onClick={() => handleMoveDown(index)} >
                                    <ArrowDownwardIcon color='info' />
                                </IconButton>
                                <IconButton onClick={() => handleAddFlag(index)} >
                                    <AddCircleOutlined color={'info'} />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(index)} >
                                    <DeleteIcon color={'error'} />
                                </IconButton>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 8, md: 3 }}>
                            <Stack
                                direction="column" spacing={1}>
                                {encoding?.featureFlags.map((data) =>

                                    <FlagChip
                                        key={'chip' + data.key}
                                        style={{ padding: '1em' }}
                                        data={data} onClick={() => handleChipClick(data.key, index)}
                                        onDelete={() => handleChipDelete(data.key, index)}
                                    />
                                )}
                            </Stack>
                        </Grid>
                        <Grid alignItems='center' size={{ xs: 8, md: 6 }}>
                            <Tooltip title='Copy Encoding'>
                                <Paper className='encoding-paper'
                                    onClick={() => {
                                        handleCopy(encoding.encoding)
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        textAlign: 'center', padding: '1em 1em',
                                        overflowWrap: 'break-word',
                                        display: 'flex',
                                        alignItems: 'center', // Align text vertically
                                        justifyContent: 'center', // Align text horizontally
                                    }}>
                                    <Typography
                                        fontSize={'1.3rem'}
                                        maxWidth={'100%'}>
                                        <code>
                                            {encoding.encoding}
                                        </code>
                                    </Typography>
                                </Paper>
                            </Tooltip>

                        </Grid>
                    </Grid>
                )
            }
            )}
            <Modal
                open={modelOpen}
                onClose={() => setModelOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h6' style={{ textAlign: 'center' }}>
                        Add new Feature Flags
                    </Typography>
                    <ChipsList chipData={clickedEncodingFeatureFlags}
                        onChipClick={(number) => handleChipClick(number, clickedEncodingIndex)}
                        onChipDelete={(number) => handleChipDelete(number, clickedEncodingIndex)} />
                    <FeatureFlagForm>
                        <FeatureFlagForm.FlagTextField onAddFeatureFlag={(flagText) => onAddFlagEvent(flagText, clickedEncodingIndex)} />
                        <FeatureFlagForm.AddButton onAddFeatureFlag={(flagText) => onAddFlagEvent(flagText, clickedEncodingIndex)} />
                    </FeatureFlagForm>

                </Box>
            </Modal>
        </>
    )
}
