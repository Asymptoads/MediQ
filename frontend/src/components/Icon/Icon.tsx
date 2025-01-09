import React from 'react';
import { Icon as MuiIcon } from '@mui/material';

interface IconProps {
  id: string;
  styles?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  color?: 'inherit' | 'action' | 'disabled' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  fontSize?: 'inherit' | 'small' | 'medium' | 'large';
}

const Icon: React.FC<IconProps> = ({
  id,
  styles = {},
  className = '',
  onClick,
  color = 'inherit',
  fontSize = 'medium',
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
