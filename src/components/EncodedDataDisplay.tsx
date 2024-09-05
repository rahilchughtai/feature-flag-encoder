import { Alert, Box, Snackbar, SnackbarCloseReason, Typography } from "@mui/material";
import { FeatureFlagEncoding } from "../models/featureFlagModel";
import { PropsWithChildren, useState } from "react";
import EncodedDataListItem from "./EncodedDataListItem";
import { SnackbarContext } from "../context/snackbar";



export default function EncodedDataDisplay({ children }: PropsWithChildren) {
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

    return (
        <SnackbarContext.Provider value={{ snackbarOpen: open, setSnackbarOpen: setOpen }}>
            <Box>
                {children}
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
        </SnackbarContext.Provider>
    )
}


EncodedDataDisplay.Title = EncodeDataTitle;
EncodedDataDisplay.ListItem = EncodedDataListItem;

function EncodeDataTitle({ encodingList }: { encodingList: FeatureFlagEncoding[] }) {
    const ListTitle = encodingList.length > 0 ? 'Encoded Feature Flags List' : 'Your encodings will show up here';

    return (
        <Typography
            style={{ marginTop: '1em' }}
            align="center"
            color={'secondary'}
            variant="h4"
        >
            {ListTitle}
        </Typography>
    )
}