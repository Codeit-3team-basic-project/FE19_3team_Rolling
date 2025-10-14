import clsx from 'clsx';
import { ButtonStyles } from './buttonStyles';

export default function Button({
  children,
  size = '56',
  state = 'enabled', //'enabled' | 'hover' | 'pressed' | 'focus' | 'disabled'
  variant = 'outlined', //'primary' | 'secondary' | 'outlined' | 'circle'
  icon,
  ...props
}) {
  const isDisabled = state === 'disabled';
  const iconOnly = !children;
  return (
    <button
      className={clsx(
        ButtonStyles.base,
        variant !== 'arrow' && ButtonStyles.size[size],
        ButtonStyles.variant[variant][state],
        icon && children ? 'flex items-center gap-[4px]' : '',
        iconOnly ? 'justify-center' : ''
      )}
      disabled={isDisabled}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
