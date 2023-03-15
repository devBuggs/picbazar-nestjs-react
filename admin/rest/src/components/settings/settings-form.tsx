import Input from '@/components/ui/input';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import { useState } from 'react';
import {
  ContactDetailsInput,
  Shipping,
  ShopSocialInput,
  Tax,
  AttachmentInput,
  Settings,
  PaymentGateway,
} from '@/types';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import Label from '@/components/ui/label';
import { CURRENCY } from './currency';
import { siteSettings } from '@/settings/site.settings';
import ValidationError from '@/components/ui/form-validation-error';
import { useUpdateSettingsMutation } from '@/data/settings';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsValidationSchema } from './settings-validation-schema';
import FileInput from '@/components/ui/file-input';
import SelectInput from '@/components/ui/select-input';
import TextArea from '@/components/ui/text-area';
import Alert from '@/components/ui/alert';
import { getIcon } from '@/utils/get-icon';
import * as socialIcons from '@/components/icons/social';
import GooglePlacesAutocomplete from '@/components/form/google-places-autocomplete';
import omit from 'lodash/omit';
import SwitchInput from '@/components/ui/switch-input';
import { useRouter } from 'next/router';
import { Config } from '@/config';
import { PAYMENT_GATEWAY } from '@/components/settings/payment';
import CopyContent from '@/components/ui/copy-content/copy-content';

type FormValues = {
  siteTitle: string;
  siteSubtitle: string;
  currency: any;
  minimumOrderAmount: number;
  logo: any;
  useOtp: boolean;
  freeShipping: boolean;
  freeShippingAmount: number;
  useCashOnDelivery: boolean;
  paymentGateway: any;
  taxClass: Tax;
  shippingClass: Shipping;
  signupPoints: number;
  maximumQuestionLimit: number;
  currencyToWalletRatio: number;
  contactDetails: ContactDetailsInput;
  deliveryTime: {
    title: string;
    description: string;
  }[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    ogImage?: AttachmentInput;
    twitterHandle: string;
    twitterCardType: string;
    metaTags: string;
    canonicalUrl: string;
  };
  google: {
    isEnable: boolean;
    tagManagerId: string;
  };
  facebook: {
    isEnable: boolean;
    appId: string;
    pageId: string;
  };
};

const socialIcon = [
  {
    value: 'FacebookIcon',
    label: 'Facebook',
  },
  {
    value: 'InstagramIcon',
    label: 'Instagram',
  },
  {
    value: 'TwitterIcon',
    label: 'Twitter',
  },
  {
    value: 'YouTubeIcon',
    label: 'Youtube',
  },
];

export const updatedIcons = socialIcon.map((item: any) => {
  item.label = (
    <div className="flex items-center text-body space-s-4">
      <span className="flex h-4 w-4 items-center justify-center">
        {getIcon({
          iconList: socialIcons,
          iconName: item.value,
          className: 'w-4 h-4',
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type IProps = {
  settings?: Settings | null;
  taxClasses: Tax[] | undefined | null;
  shippingClasses: Shipping[] | undefined | null;
};

// TODO: Split Settings
export default function SettingsForm({
  settings,
  taxClasses,
  shippingClasses,
}: IProps) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const { mutate: updateSettingsMutation, isLoading: loading } =
    useUpdateSettingsMutation();
  const { language, options } = settings ?? {};

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(settingsValidationSchema),
    defaultValues: {
      ...options,
      contactDetails: {
        ...options?.contactDetails,
        socials: options?.contactDetails?.socials
          ? options?.contactDetails?.socials.map((social: any) => ({
              icon: updatedIcons?.find((icon) => icon?.value === social?.icon),
              url: social?.url,
            }))
          : [],
      },
      deliveryTime: options?.deliveryTime ? options?.deliveryTime : [],
      logo: options?.logo ?? '',
      currency: options?.currency
        ? CURRENCY.find((item) => item.code == options?.currency)
        : '',
      paymentGateway: options?.paymentGateway
        ? PAYMENT_GATEWAY.find((item) => item.name == options?.paymentGateway)
        : PAYMENT_GATEWAY[0],
      // @ts-ignore
      taxClass: !!taxClasses?.length
        ? taxClasses?.find((tax: Tax) => tax.id == options?.taxClass)
        : '',
      // @ts-ignore
      shippingClass: !!shippingClasses?.length
        ? shippingClasses?.find(
            (shipping: Shipping) => shipping.id == options?.shippingClass
          )
        : '',
    },
  });

  const enableFreeShipping = watch('freeShipping');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'deliveryTime',
  });

  const {
    fields: socialFields,
    append: socialAppend,
    remove: socialRemove,
  } = useFieldArray({
    control,
    name: 'contactDetails.socials',
  });

  const isNotDefaultSettingsPage = Config.defaultLanguage !== locale;

  async function onSubmit(values: FormValues) {
    const contactDetails = {
      ...values?.contactDetails,
      location: { ...omit(values?.contactDetails?.location, '__typename') },
      socials: values?.contactDetails?.socials
        ? values?.contactDetails?.socials?.map((social: any) => ({
            icon: social?.icon?.value,
            url: social?.url,
          }))
        : [],
    };
    // TODO : ts type check korte hobe on activatedGateway
    updateSettingsMutation({
      language: locale,
      options: {
        ...values,
        signupPoints: Number(values.signupPoints),
        currencyToWalletRatio: Number(values.currencyToWalletRatio),
        minimumOrderAmount: Number(values.minimumOrderAmount),
        freeShippingAmount: Number(values.freeShippingAmount),
        currency: values.currency?.code,
        paymentGateway: values.paymentGateway?.name,
        taxClass: values?.taxClass?.id,
        shippingClass: values?.shippingClass?.id,
        logo: values?.logo,
        contactDetails,
        //@ts-ignore
        seo: {
          ...values?.seo,
          ogImage: values?.seo?.ogImage,
        },
      },
    });
    console.log(values, 'valuess');
  }

  const paymentGateway = watch('paymentGateway');
  const logoInformation = (
    <span>
      {t('form:logo-help-text')} <br />
      {t('form:logo-dimension-help-text')} &nbsp;
      <span className="font-bold">
        {siteSettings.logo.width}x{siteSettings.logo.height} {t('common:pixel')}
      </span>
    </span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-logo')}
          details={logoInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="logo" control={control} multiple={false} />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:site-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-site-title')}
            {...register('siteTitle')}
            error={t(errors.siteTitle?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-site-subtitle')}
            {...register('siteSubtitle')}
            error={t(errors.siteSubtitle?.message!)}
            variant="outline"
            className="mb-5"
          />

          <div className="mb-5">
            <Label>{t('form:input-label-currency')}</Label>
            <SelectInput
              name="currency"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.code}
              options={CURRENCY}
              disabled={isNotDefaultSettingsPage}
            />
            <ValidationError message={t(errors.currency?.message)} />
          </div>
          <Input
            label={`${t('form:input-label-min-order-amount')}`}
            {...register('minimumOrderAmount')}
            type="number"
            error={t(errors.minimumOrderAmount?.message!)}
            variant="outline"
            className="mb-5"
            disabled={isNotDefaultSettingsPage}
          />
          <Input
            label={`${t('form:input-label-wallet-currency-ratio')}`}
            {...register('currencyToWalletRatio')}
            type="number"
            error={t(errors.currencyToWalletRatio?.message!)}
            variant="outline"
            className="mb-5"
            disabled={isNotDefaultSettingsPage}
          />
          <Input
            label={`${t('form:input-label-signup-points')}`}
            {...register('signupPoints')}
            type="number"
            error={t(errors.signupPoints?.message!)}
            variant="outline"
            className="mb-5"
            disabled={isNotDefaultSettingsPage}
          />

          <Input
            label={`${t('form:input-label-maximum-question-limit')}`}
            {...register('maximumQuestionLimit')}
            type="number"
            error={t(errors.maximumQuestionLimit?.message!)}
            variant="outline"
            className="mb-5"
            disabled={isNotDefaultSettingsPage}
          />

          <div className="mb-5">
            <div className="flex items-center gap-x-4">
              <SwitchInput
                name="useOtp"
                control={control}
                disabled={isNotDefaultSettingsPage}
              />
              <Label className="mb-0">{t('form:input-label-enable-otp')}</Label>
            </div>
          </div>

          <div className="mb-5">
            <Label>{t('form:input-label-tax-class')}</Label>
            <SelectInput
              name="taxClass"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={taxClasses!}
              disabled={isNotDefaultSettingsPage}
            />
          </div>

          <div className="mb-5">
            <Label>{t('form:input-label-shipping-class')}</Label>
            <SelectInput
              name="shippingClass"
              control={control}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              options={shippingClasses!}
              disabled={isNotDefaultSettingsPage}
            />
          </div>

          <div className="mb-5">
            <Label>{t('form:input-label-enable-free-shipping')}</Label>
            <SwitchInput
              name="freeShipping"
              control={control}
              checked={enableFreeShipping}
              disabled={isNotDefaultSettingsPage}
            />
          </div>

          {enableFreeShipping && (
            <Input
              label={t('form:free-shipping-input-label-amount')}
              {...register('freeShippingAmount')}
              error={t(errors.freeShippingAmount?.message!)}
              variant="outline"
              type="number"
              className="mb-5"
              disabled={isNotDefaultSettingsPage}
            />
          )}
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('Payment')}
          details={t('Configure Payment Option')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <div className="flex items-center gap-x-4">
              <SwitchInput
                name="useCashOnDelivery"
                control={control}
                disabled={isNotDefaultSettingsPage}
              />
              <Label className="mb-0">{t('Enable Cash On Delivery')}</Label>
            </div>
          </div>

          <div className="mb-5">
            <Label>{t('Select Payment Gateway')}</Label>
            <SelectInput
              name="paymentGateway"
              control={control}
              getOptionLabel={(option: any) => option.title}
              getOptionValue={(option: any) => option.name}
              options={PAYMENT_GATEWAY}
              disabled={isNotDefaultSettingsPage}
            />
          </div>

          <div className="mb-0">
            <CopyContent
              label={t('text-webhook-url')}
              variant="outline"
              value={`${
                process.env.NEXT_PUBLIC_REST_API_ENDPOINT
              }/webhooks/${paymentGateway?.name?.toLowerCase()}`}
              name="webhook"
            />
          </div>
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="SEO"
          details={t('form:tax-form-seo-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-meta-title')}
            {...register('seo.metaTitle')}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('form:input-label-meta-description')}
            {...register('seo.metaDescription')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-meta-tags')}
            {...register('seo.metaTags')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-canonical-url')}
            {...register('seo.canonicalUrl')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('form:input-label-og-title')}
            {...register('seo.ogTitle')}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('form:input-label-og-description')}
            {...register('seo.ogDescription')}
            variant="outline"
            className="mb-5"
          />
          <div className="mb-5">
            <Label>{t('form:input-label-og-image')}</Label>
            <FileInput name="seo.ogImage" control={control} multiple={false} />
          </div>
          <Input
            label={t('form:input-label-twitter-handle')}
            {...register('seo.twitterHandle')}
            variant="outline"
            className="mb-5"
            placeholder="your twitter username (exp: @username)"
          />
          <Input
            label={t('form:input-label-twitter-card-type')}
            {...register('seo.twitterCardType')}
            variant="outline"
            className="mb-5"
            placeholder="one of summary, summary_large_image, app, or player"
          />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:text-delivery-schedule')}
          details={t('form:delivery-schedule-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div>
            {fields.map((item: any & { id: string }, index: number) => (
              <div
                className="border-b border-dashed border-border-200 py-5 first:pt-0 last:border-0 md:py-8"
                key={item.id}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
                  <div className="grid grid-cols-1 gap-5 sm:col-span-4">
                    <Input
                      label={t('form:input-delivery-time-title')}
                      variant="outline"
                      {...register(`deliveryTime.${index}.title` as const)}
                      defaultValue={item?.title!} // make sure to set up defaultValue
                      // @ts-ignore
                      error={t(errors?.deliveryTime?.[index]?.title?.message)}
                    />
                    <TextArea
                      label={t('form:input-delivery-time-description')}
                      variant="outline"
                      {...register(
                        `deliveryTime.${index}.description` as const
                      )}
                      defaultValue={item.description!} // make sure to set up defaultValue
                    />
                  </div>

                  <button
                    onClick={() => {
                      remove(index);
                    }}
                    type="button"
                    className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-4"
                  >
                    {t('form:button-label-remove')}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            onClick={() => append({ title: '', description: '' })}
            className="w-full sm:w-auto"
          >
            {t('form:button-label-add-delivery-time')}
          </Button>

          {
            /*@ts-ignore*/
            errors?.deliveryTime?.message ? (
              <Alert
                // @ts-ignore
                message={t(errors?.deliveryTime?.message)}
                variant="error"
                className="mt-5"
              />
            ) : null
          }
        </Card>
      </div>

      <div className="my-5 flex flex-wrap border-b border-dashed border-gray-300 pb-8 sm:my-8">
        <Description
          title={t('form:shop-settings')}
          details={t('form:shop-settings-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <Label>{t('form:input-label-autocomplete')}</Label>
            <Controller
              control={control}
              name="contactDetails.location"
              render={({ field: { onChange } }) => (
                <GooglePlacesAutocomplete
                  onChange={onChange}
                  data={getValues('contactDetails.location')!}
                  disabled={isNotDefaultSettingsPage}
                />
              )}
            />
          </div>
          <Input
            label={t('form:input-label-contact')}
            {...register('contactDetails.contact')}
            variant="outline"
            className="mb-5"
            error={t(errors.contactDetails?.contact?.message!)}
            disabled={isNotDefaultSettingsPage}
          />
          <Input
            label={t('form:input-label-website')}
            {...register('contactDetails.website')}
            variant="outline"
            className="mb-5"
            error={t(errors.contactDetails?.website?.message!)}
            disabled={isNotDefaultSettingsPage}
          />

          {/* Social and Icon picker */}
          <div>
            {socialFields.map(
              (item: ShopSocialInput & { id: string }, index: number) => (
                <div
                  className="border-b border-dashed border-border-200 py-5 first:mt-5 first:border-t last:border-b-0 md:py-8 md:first:mt-10"
                  key={item.id}
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-5">
                    <div className="sm:col-span-2">
                      <Label className="whitespace-nowrap">
                        {t('form:input-label-select-platform')}
                      </Label>
                      <SelectInput
                        name={`contactDetails.socials.${index}.icon` as const}
                        control={control}
                        options={updatedIcons}
                        isClearable={true}
                        defaultValue={item?.icon!}
                        disabled={isNotDefaultSettingsPage}
                      />
                    </div>
                    <Input
                      className="sm:col-span-2"
                      label={t('form:input-label-social-url')}
                      variant="outline"
                      {...register(
                        `contactDetails.socials.${index}.url` as const
                      )}
                      defaultValue={item.url!} // make sure to set up defaultValue
                      disabled={isNotDefaultSettingsPage}
                    />
                    {!isNotDefaultSettingsPage && (
                      <button
                        onClick={() => {
                          socialRemove(index);
                        }}
                        type="button"
                        className="text-sm text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none sm:col-span-1 sm:mt-4"
                        disabled={isNotDefaultSettingsPage}
                      >
                        {t('form:button-label-remove')}
                      </button>
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          {!isNotDefaultSettingsPage && (
            <Button
              type="button"
              onClick={() => socialAppend({ icon: '', url: '' })}
              className="w-full sm:w-auto"
              disabled={isNotDefaultSettingsPage}
            >
              {t('form:button-label-add-social')}
            </Button>
          )}
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button loading={loading} disabled={loading}>
          {t('form:button-label-save-settings')}
        </Button>
      </div>
    </form>
  );
}
