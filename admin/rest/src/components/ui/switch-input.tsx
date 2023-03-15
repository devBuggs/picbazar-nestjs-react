import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Switch } from '@headlessui/react';
import ValidationError from './form-validation-error';
import { useTranslation } from 'next-i18next';

interface Props {
  control: Control<any>;
  errors?: FieldErrors;
  label?: string;
  name: string;
  disabled?: boolean;
  [key: string]: unknown;
}

const SwitchInput = ({
  control,
  label,
  name,
  errors,
  disabled,
  ...rest
}: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      {label && <div>{label}</div>}
      <Controller
        name={name}
        control={control}
        {...rest}
        render={({ field: { onChange, value } }) => (
          <Switch
            checked={value}
            onChange={onChange}
            disabled={disabled}
            className={`${
              value ? 'bg-accent' : 'bg-gray-300'
            } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none ${
              disabled ? 'cursor-not-allowed bg-[#EEF1F4]' : ''
            }`}
            dir="ltr"
          >
            <span className="sr-only">Enable {label}</span>
            <span
              className={`${
                value ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-light transition-transform`}
            />
          </Switch>
        )}
      />
      {errors ? <ValidationError message={t(errors?.[name]?.message)} /> : ''}
    </div>
  );
};

export default SwitchInput;
