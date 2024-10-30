// src/App.tsx
import React from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { increment, decrement, incrementByAmount } from './store/counterSlice';

const App: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="app">
      <h1>Hello, SCSS in React!</h1>
    </div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  );
};

export default App;
