import Attribute from '@/components/ui/attribute';
import { useAttributes } from './attributes.context';
import Scrollbar from '@/components/ui/scrollbar';
interface Props {
  variations: any;
  variant?: 'normal' | 'outline';
}
const VariationGroups: React.FC<Props> = ({ variations, variant }) => {
  const { attributes, setAttributes } = useAttributes();
  const replaceHyphens = (str: string) => {
    return str.replace(/-/g, ' ');
  };

  return (
    <>
      {Object.keys(variations).map((variationName, index) => (
        <div
          className="flex items-center border-b  border-border-200 border-opacity-70 py-4 first:pt-0 last:border-b-0 last:pb-0"
          key={index}
        >
          <span className="inline-block min-w-[60px] whitespace-nowrap text-sm font-semibold capitalize leading-none text-heading ltr:mr-5 rtl:ml-5">
            {replaceHyphens(variationName)} :
          </span>
          <div className="-mb-5 w-full overflow-hidden">
            <Scrollbar
              className="w-full pb-5"
              options={{
                scrollbars: {
                  autoHide: 'never',
                },
              }}
            >
              <div className="-mb-1.5 flex w-full space-x-4 rtl:space-x-reverse">
                {variations[variationName].map((attribute: any) => (
                  <Attribute
                    // className={variationName}
                    type={variationName}
                    color={attribute.meta ? attribute.meta : attribute?.value}
                    isActive={attributes[variationName] === attribute.value}
                    value={attribute.value}
                    key={attribute.id}
                    variant={variant}
                    onClick={() =>
                      setAttributes((prev: any) => ({
                        ...prev,
                        [variationName]: attribute.value,
                      }))
                    }
                  />
                ))}
              </div>
            </Scrollbar>
          </div>
        </div>
      ))}
    </>
  );
};

export default VariationGroups;
