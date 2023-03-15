import Input from '@/components/ui/input';
import TextArea from '@/components/ui/text-area';
import { useForm, FormProvider } from 'react-hook-form';
import Button from '@/components/ui/button';
import { getErrorMessage } from '@/utils/form-error';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import Label from '@/components/ui/label';
import Radio from '@/components/ui/radio/radio';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import FileInput from '@/components/ui/file-input';
import { productValidationSchema } from './product-validation-schema';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/graphql/products.graphql';
import ProductVariableForm from './product-variable-form';
import ProductSimpleForm from './product-simple-form';
import ProductGroupInput from './product-group-input';
import ProductCategoryInput from './product-category-input';
import ProductAuthorInput from './product-author-input';
import ProductManufacturerInput from './product-manufacturer-input';
import ProductTypeInput from './product-type-input';
import { useTranslation } from 'next-i18next';
import { useShopQuery } from '@/graphql/shops.graphql';
import ProductTagInput from './product-tag-input';
import Alert from '@/components/ui/alert';
import { useState } from 'react';
import { Product, ProductType } from '__generated__/__types__';
import {
  getProductDefaultValues,
  getProductInputValues,
  ProductFormValues,
} from './form-utils';
import { Routes } from '@/config/routes';
import { Config } from '@/config';
import { EditIcon } from '@/components/icons/edit';
import { split, join } from 'lodash';

type ProductFormProps = {
  initialValues?: Product | null;
};

export default function CreateOrUpdateProductForm({
  initialValues,
}: ProductFormProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSlugDisable, setIsSlugDisable] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data } = useShopQuery({
    variables: {
      slug: router.query.shop as string,
    },
  });
  const shopId = data?.shop?.id!;
  const isNewTranslation = router?.query?.action === 'translate';
  const isSlugEditable = router?.query?.action === 'edit' && router?.locale === Config.defaultLanguage;
  const generateRedirectUrl = router.query.shop
    ? `/${router.query.shop}${Routes.product.list}`
    : Routes.product.list;
  const methods = useForm<ProductFormValues>({
    //@ts-ignore
    resolver: yupResolver(productValidationSchema),
    shouldUnregister: true,
    //@ts-ignore
    defaultValues: getProductDefaultValues(initialValues, isNewTranslation),
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = methods;

  const [createProduct, { loading: creating }] = useCreateProductMutation({
    onCompleted: async () => {
      await router.push(generateRedirectUrl, undefined, {
        locale: Config.defaultLanguage,
      });

      toast.success(t('common:create-success'));
    },
    onError: (error) => {
      const serverErrors = getErrorMessage(error);
      if (serverErrors?.validation.length) {
        Object.keys(serverErrors?.validation).forEach((field: any) => {
          setError(field.split('.')[1], {
            type: 'manual',
            message: serverErrors?.validation[field][0],
          });
        });
      } else {
        setErrorMessage(error?.message);
      }
    },
  });
  const [updateProduct, { loading: updating }] = useUpdateProductMutation({
    onCompleted: async ({ updateProduct }) => {
      if (updateProduct) {
        if (initialValues?.slug !== updateProduct?.slug) {
          await router.push(
            `${generateRedirectUrl}/${updateProduct?.slug}/edit`,
            undefined,
            {
              locale: Config.defaultLanguage,
            }
          );
        }
      }

      toast.success(t('common:successfully-updated'));
    },
    onError: (error) => {
      const serverErrors = getErrorMessage(error);
      if (serverErrors?.validation.length) {
        Object.keys(serverErrors?.validation).forEach((field: any) => {
          setError(field.split('.')[1], {
            type: 'manual',
            message: serverErrors?.validation[field][0],
          });
        });
      } else {
        setErrorMessage(error?.message);
      }
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    const inputValues = getProductInputValues(values, initialValues);

    try {
      if (
        !initialValues ||
        !initialValues?.translated_languages?.includes(router?.locale!)
      ) {
        await createProduct({
          variables: {
            // @ts-ignore
            input: {
              ...inputValues,
              shop_id: shopId || initialValues?.shop_id,
              // @ts-ignore
              language: router.locale,
              ...(initialValues?.slug && { slug: initialValues.slug }),
            },
          },
        });
      } else {
        await updateProduct({
          variables: {
            // @ts-ignore
            input: {
              ...inputValues,
              id: initialValues.id!,
              shop_id: initialValues.shop_id!,
            },
          },
        });
      }
    } catch (error) {
      const serverErrors = getErrorMessage(error);
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        });
      });
    }
  };

  // @ts-ignore
  const selectedProductType = watch('product_type');
  const slugAutoSuggest = join(split(watch('name'), ' '), '-').toLowerCase();
  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit as any)} noValidate>
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:featured-image-title')}
              details={t('form:featured-image-help-text')}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileInput name="image" control={control} multiple={false} />
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:gallery-title')}
              details={t('form:gallery-help-text')}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileInput name="gallery" control={control} />
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:type-and-category')}
              details={t('form:type-and-category-help-text')}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <ProductGroupInput
                control={control}
                error={t((errors.type as any)?.message)}
              />
              <ProductCategoryInput control={control} setValue={setValue} />
              <ProductAuthorInput control={control} />
              <ProductManufacturerInput control={control} setValue={setValue} />
              <ProductTagInput control={control} setValue={setValue} />
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:item-description')}
              details={`${
                initialValues
                  ? t('form:item-description-edit')
                  : t('form:item-description-add')
              } ${t('form:product-description-help-text')}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t('form:input-label-name')}*`}
                {...register('name')}
                error={t(errors.name?.message!)}
                variant="outline"
                className="mb-5"
              />

              {isSlugEditable ? (
                <div className="relative mb-5">
                  <Input
                    label={`${t('Slug')}`}
                    {...register('slug')}
                    error={t(errors.slug?.message!)}
                    variant="outline"
                    disabled={isSlugDisable}
                  />
                  <button
                    className="absolute top-[27px] right-px z-10 flex h-[46px] w-11 items-center justify-center rounded-tr rounded-br border-l border-solid border-border-base bg-white px-2 text-body transition duration-200 hover:text-heading focus:outline-none"
                    type="button"
                    title={t('common:text-edit')}
                    onClick={() => setIsSlugDisable(false)}
                  >
                    <EditIcon width={14} />
                  </button>
                </div>
              ) : (
                <Input
                  label={`${t('Slug')}`}
                  {...register('slug')}
                  value={slugAutoSuggest}
                  variant="outline"
                  className="mb-5"
                  disabled
                />
              )}

              <Input
                label={`${t('form:input-label-unit')}*`}
                {...register('unit')}
                error={t(errors.unit?.message!)}
                variant="outline"
                className="mb-5"
              />

              <TextArea
                label={t('form:input-label-description')}
                {...register('description')}
                error={t(errors.description?.message!)}
                variant="outline"
                className="mb-5"
              />

              <div>
                <Label>{t('form:input-label-status')}</Label>
                <Radio
                  {...register('status')}
                  label={t('form:input-label-published')}
                  id="published"
                  value="PUBLISH"
                  className="mb-2"
                />
                <Radio
                  {...register('status')}
                  id="draft"
                  label={t('form:input-label-draft')}
                  value="DRAFT"
                />
              </div>
            </Card>
          </div>
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t('form:form-title-product-type')}
              details={t('form:form-description-product-type')}
              className="w-full px-0 sm:pr-4 md:pr-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <ProductTypeInput />
          </div>

          {/* Simple Type */}
          {selectedProductType?.value === ProductType.Simple && (
            <ProductSimpleForm initialValues={initialValues} />
          )}

          {/* Variation Type */}
          {selectedProductType?.value === ProductType.Variable && (
            <ProductVariableForm initialValues={initialValues} />
          )}

          <div className="mb-4 text-end">
            {initialValues && (
              <Button
                variant="outline"
                onClick={router.back}
                className="me-4"
                type="button"
              >
                {t('form:button-label-back')}
              </Button>
            )}
            <Button loading={updating || creating}>
              {initialValues
                ? t('form:button-label-update-product')
                : t('form:button-label-add-product')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
