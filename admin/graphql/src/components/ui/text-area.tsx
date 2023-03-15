import cn from 'classnames';
import React, { TextareaHTMLAttributes } from 'react';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  // name: string;
  error?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
  disabled?: boolean
}

const classes = {
  root: 'py-3 px-4 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  shadow: 'focus:shadow',
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const {
    className,
    label,
    name,
    error,
    variant = 'normal',
    shadow = false,
    inputClassName,
    disabled,
    ...rest
  } = props;

  const rootClassName = cn(
    classes.root,
    {
      [classes.normal]: variant === 'normal',
      [classes.solid]: variant === 'solid',
      [classes.outline]: variant === 'outline',
    },
    {
      [classes.shadow]: shadow,
    },
    inputClassName
  );

  return (
    <div className={className}>
      {label && (
        <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className={`${rootClassName} ${disabled ? 'cursor-not-allowed bg-[#EEF1F4] border-[#D4D8DD]' : ''}`}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        rows={4}
        ref={ref}
        disabled={disabled}
        {...rest}
      />
      {error && <p className="my-2 text-xs text-end text-red-500">{error}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
