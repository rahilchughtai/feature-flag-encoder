import { Box, Paper, Stack, styled, TextField, Typography, useTheme, IconButton, Button, Tooltip } from '@mui/material'
import React from 'react'
import { FeatureFlagEncoding } from '../models/featureFlagModel';
import { encodeFlags } from '../utils/encoder';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface EncodingListProps {
    encodingList: FeatureFlagEncoding[],
    handleCopy: (text: string) => void
    setEncodingList: React.Dispatch<React.SetStateAction<FeatureFlagEncoding[]>>
}



export default function EncodedDataListItem({ encodingList, handleCopy, setEncodingList }: EncodingListProps) {

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

    const handleClick = (key: number, index: number) => {
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
                                <IconButton onClick={() => handleDelete(index)} >
                                    <DeleteIcon color={'error'} />
                                </IconButton>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 8, md: 3 }}>
                            <Stack
                                direction="column" spacing={1}>
                                {encoding?.featureFlags.map((data) =>
                                    <Button
                                        onClick={() => handleClick(data.key, index)}
                                        style={{ padding: '.7em', fontSize: '1rem' }} key={data.key} variant='contained' color={data.enabled ? 'success' : 'error'} >
                                        {data.label}
                                    </Button>
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
        </>
    )
}
