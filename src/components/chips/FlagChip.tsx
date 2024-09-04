import React from 'react'
import { FeatureFlagChipData } from '../../models/featureFlagModel'
import { Chip } from '@mui/material'


interface ChipProps {
    data: FeatureFlagChipData,
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
    onDelete: ((event: unknown) => void) | undefined,
    style?: React.CSSProperties | undefined
}

export default function FlagChip({ onClick, onDelete, data, style }: ChipProps) {

    return (
        <Chip
            sx={{ height: '4em', width: '100%', fontSize: '.9em' }}
            size='medium'
            style={style}
            color={data.enabled ? 'success' : 'error'}
            onClick={onClick}
            label={data.label}
            onDelete={onDelete}
        />
    )
}
