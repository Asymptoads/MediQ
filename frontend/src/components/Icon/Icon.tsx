// components/Icon/Icon.tsx
import React from 'react';
import { Icon as MuiIcon } from '@mui/material';

interface IconProps {
  id: string;  // This will be any valid Material UI icon ID
  styles?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  fontSize?: 'inherit' | 'small' | 'medium' | 'large';
}

const Icon: React.FC<IconProps> = ({
  id,
  styles = {},
  className = '',
  onClick,
  color = 'inherit',
  fontSize = 'medium'
}) => {
  return (
    <MuiIcon
      className={`material-icons ${className}`.trim()}
      style={styles}
      onClick={onClick}
      color={color}
      fontSize={fontSize}
    >
      {id}
    </MuiIcon>
  );
};

export default Icon;

//<Icon id ="Search" />
//<Icon id = "person_outline" color = "primary" font size = "large"/> 