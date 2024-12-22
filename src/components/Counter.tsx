import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { increment, decrement, incrementByAmount } from '../store/slices/counterSlice';

const CounterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const Counter: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <CounterPaper elevation={3}>
      <Typography variant="h4" component="h1">
        Counter App
      </Typography>
      <Typography variant="h2" color="primary">
        {count}
      </Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RemoveIcon />}
          onClick={() => dispatch(decrement())}
        >
          Decrease
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => dispatch(increment())}
        >
          Increase
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Add 5
        </Button>
      </ButtonGroup>
    </CounterPaper>
  );
};

export default Counter;
