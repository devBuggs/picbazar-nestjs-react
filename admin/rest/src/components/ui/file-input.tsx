import Uploader from '@/components/common/uploader';
import { Controller } from 'react-hook-form';

interface FileInputProps {
  control: any;
  name: string;
  multiple?: boolean;
  acceptFile?: boolean;
  helperText?: string;
  defaultValue?: any;
  onChange: Function;
}

const FileInput = ({
  control,
  name,
  multiple = true,
  acceptFile = false,
  helperText,
  defaultValue = [],
  onChange,
}: FileInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { ref, ...rest } }) => (
        <Uploader
          {...rest}
          multiple={multiple}
          acceptFile={acceptFile}
          helperText={helperText}
          onChange={onChange}
        />
      )}
    />
  );
};

export default FileInput;
