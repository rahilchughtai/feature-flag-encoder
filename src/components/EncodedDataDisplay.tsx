import { Alert, Box, Snackbar, SnackbarCloseReason, Typography } from "@mui/material";
import { FeatureFlagEncoding } from "../models/featureFlagModel";
import { useState } from "react";
import EncodedDataListItem from "./EncodedDataListItem";


interface EncodedDatapProps {
    encodingList: FeatureFlagEncoding[],
    setEncodingList: React.Dispatch<React.SetStateAction<FeatureFlagEncoding[]>>
}
export default function EncodedDataDisplay({ encodingList, setEncodingList }: EncodedDatapProps) {
    const [open, setOpen] = useState(false);

    const handleClose = (
        _: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleCopy = async (text: string) => {
        if (!text) { return }
        await navigator.clipboard.writeText(text);
        setOpen(true);
    };

    const ListTitle = encodingList.length > 0 ? 'Encoded Feature Flags List' : 'Your encodings will show up here';

    return (
        <Box>
            <Typography
                style={{ marginTop: '1em' }}
                align="center"
                color={'secondary'}
                variant="h4"

            >
                {ListTitle}
            </Typography>
            <EncodedDataListItem setEncodingList={setEncodingList} encodingList={encodingList} handleCopy={handleCopy} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Encoding Copied to Clipboard
                </Alert>
            </Snackbar>
        </Box>
    )
}
