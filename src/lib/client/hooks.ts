'use client';
import { useTheme } from '@mui/material';
import useMuiMediaQuery from '@mui/material/useMediaQuery';
import { useReducer } from 'react';

export const useMediaQuery = (
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  direction: 'down' | 'up' = 'down'
) => {
  const { breakpoints } = useTheme();
  return useMuiMediaQuery(breakpoints?.[direction]?.(breakpoint));
};

const actionTypes = {
  toggle: 'TOGGLE',
  on: 'ON',
  off: 'OFF',
} as const;

// @ts-expect-error wontfix
function toggleReducer(state, action) {
  switch (action.type) {
    case actionTypes.toggle: {
      return { on: action.payload ?? !state.on };
    }
    case actionTypes.on: {
      return { on: true };
    }
    case actionTypes.off: {
      return { on: false };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

export function useToggle(
  { reducer = toggleReducer, initialState } = { initialState: false }
) {
  const [{ on }, dispatch] = useReducer(reducer, { on: initialState });

  const toggle = (state?: boolean) =>
    dispatch({ type: actionTypes.toggle, payload: state });
  const setOn = () => dispatch({ type: actionTypes.on });
  const setOff = () => dispatch({ type: actionTypes.off });

  return { on, toggle, setOn, setOff, toggleReducer };
}
