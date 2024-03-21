import { SvgIcon } from '@mui/material';
import { ReactNode } from 'react';

interface IconProps {
  stroke?: string;
  strokeWidth?: string | number;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  children?: ReactNode | string;
  className?: string;
  onClick?: () => void;
  fill?: string;
}

export const Briefcase = ({
  stroke = '#2c3e50',
  width = 44,
  height = 44,
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke={stroke}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M0 0h24v24H0z' stroke='none' />
      <rect x={3} y={7} width={18} height={13} rx={2} />
      <path d='M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M12 12v.01M3 13a20 20 0 0018 0' />
    </svg>
  );
};

export const BusinessPlan = ({
  stroke,
  width,
  height,
  ...props
}: IconProps) => {
  return (
    <svg
      width={width || 44}
      height={height || 44}
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke={stroke || '#2c3e50'}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <ellipse cx='16' cy='6' rx='5' ry='3' />
      <path d='M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4' />
      <path d='M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4' />
      <path d='M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4' />
      <path d='M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5' />
      <path d='M5 15v1m0 -8v1' />
    </svg>
  );
};

export const ChartBar = ({ stroke, width, height, ...props }: IconProps) => {
  return (
    <svg
      width={width || 44}
      height={height || 44}
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke={stroke || '#2c3e50'}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <rect x='3' y='12' width='6' height='8' rx='1' />
      <rect x='9' y='8' width='6' height='12' rx='1' />
      <rect x='15' y='4' width='6' height='16' rx='1' />
      <line x1='4' y1='20' x2='18' y2='20' />
    </svg>
  );
};

export const Mail = ({
  children,
  width,
  className,
  height,
  stroke,
  ...props
}: IconProps) => {
  return (
    <svg
      className={className}
      width={width || 30}
      height={height || 35}
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke={stroke || '#2c3e50'}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      cursor='pointer'
      {...props}
    >
      <path d='M0 0h24v24H0z' stroke='none' />
      <rect x={3} y={5} width={18} height={14} rx={2} />
      <path d='M3 7l9 6 9-6' />
    </svg>
  );
};

export function FileIcon(props: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={40}
      height={40}
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='#fff'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M0 0h24v24H0z' stroke='none' />
      <path d='M14 3v4a1 1 0 001 1h4' />
      <path d='M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z' />
    </svg>
  );
}

export const TwitterIcon = (props: IconProps & { color?: string }) => {
  return (
    <SvgIcon
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        p: '.2rem',
        '&:hover': { '& > *': { fill: ({ palette }) => palette.primary.main } },
        '& > *': {
          fill: ({ palette }) =>
            palette.mode === 'light' ? palette.common.gray : '#FFFFFF',
        },
      }}
    >
      <svg
        xmlns='http://www.w3.org/1999/xlink'
        viewBox='0 0 507.91 446.91'
        role='none'
        width={props.width || '100%'}
        height={props.height || '100%'}
        stroke={props.stroke || '#2c3e50'}
        strokeLinecap='round'
        strokeLinejoin='round'
        fill={props.color || 'black'}
        {...props}
      >
        <title>twitter</title>
        <path
          xmlns='http://www.w3.org/2000/svg'
          d='M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z'
        />
      </svg>
    </SvgIcon>
  );
};
