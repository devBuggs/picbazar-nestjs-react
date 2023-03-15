type Props = {};

export default function LanguageSelect({}: Props) {
  return <div>LanguageSelect</div>;
}
{
  /* <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:item-translation')}
          details={`${
            initialValues
              ? t('form:item-description-update')
              : t('form:item-description-add')
          } ${t('form:type-description-help-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Label>{t('form:input-label-select-translation')}</Label>
          <Controller
            render={({ field }) => (
              <RadioGroup {...field}>
                <RadioGroup.Label className="sr-only">
                  Server size
                </RadioGroup.Label>
                <div className="space-y-2">
                  {Config.availableLanguages.map((lang) => (
                    <RadioGroup.Option
                      key={lang}
                      value={lang}
                      className={({ active, checked }) =>
                        `${
                          active
                            ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                            : ''
                        }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium  ${
                                    checked ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  {lang}
                                </RadioGroup.Label>
                                {/* <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {lang.ram}/{lang.cpus}
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{lang.disk}</span>
                          </RadioGroup.Description> */
}
//                       </div>
//                       </div>
//                       {checked && (
//                         <div className="flex-shrink-0 text-white">
//                           Checked
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </RadioGroup.Option>
//             ))}
//           </div>
//         </RadioGroup>
//       )}
//       name="language"
//       control={control}
//       // defaultValue={selected}
//     />
//   </Card>
// </div>
