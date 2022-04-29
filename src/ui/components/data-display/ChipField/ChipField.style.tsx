import { styled } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
// import { ChipFieldProps } from './ChipField';

export const ChipsContainer = styled('ul')`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    margin: 0;
    padding: ${({ theme }) => theme.spacing(2)};
    list-style-type: none;
    border: 1px solid ${({ theme }) => theme.palette.grey[100]};
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    box-sizing: border-box;
    color: ${({ theme }) => theme.palette.text.secondary};
    min-height: 68px;
`;

export const ChipStyled = styled(Chip)`
    &.MuiChip-root {
        height: auto;
        padding: ${({ theme }) => theme.spacing(2)} + ' ' +
            ${({ theme }) => theme.spacing(2)};
        border: 1px solid ${({ theme }) => theme.palette.grey[100]};
        border-radius: ${({ theme }) => theme.shape.borderRadius};
        color: ${({ theme }) => theme.palette.text.secondary};
        background-color: white;
    }
    &.MuiChip-label {
        padding: 0;
        white-space: pre-wrap;
    }

    &.MuiChip-deleteIcon {
        font-size: 14;
        margin-left: ${({ theme }) => theme.spacing(3)};
    }
`;
