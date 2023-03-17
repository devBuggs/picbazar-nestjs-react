import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Controller, useFieldArray, useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import FileInput from '@/components/ui/file-input';
import TextArea from '@/components/ui/text-area';
import { getFormattedImage } from '@/utils/get-formatted-image';
import { useCreateShopMutation, useUpdateShopMutation } from '@/data/shop';
import GooglePlacesAutocomplete from '@/components/form/google-places-autocomplete';
import Label from '@/components/ui/label';
import { getIcon } from '@/utils/get-icon';
import omit from 'lodash/omit';

import { useRouter } from 'next/router';

type FormValues = {
    barcodeNo: number;
    productName: string;
    supplierName: string;
    designNumber: number;
    sizeWeight: number;
    availableQty: number;
    purchasePrice: number;
    salePrice: number;
};

const PosForm = ({ initialValues }: { initialValues?: any }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        control
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = data => console.log(data);
    
    const { t } = useTranslation();

    const router = useRouter();
    const formActionType = router?.query?.action;
    // console.log("formActionType == ", router?.query?.action);


    return (
        <>
            <Card className='mb-5'>
                {
                    formActionType === "create" ? <h3 className='text-xl'>POS PRODUCT ENTRY</h3> : <h3 className='text-xl'>EDIT POS PRODUCT ENTRY</h3>
                }
            </Card>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="w-full sm:w-8/12 md:w-2/3">

                    {
                        formActionType === "edit" ? 
                            <div className="text-end mb-5">
                                <Button>
                                    {t('Scan Barcode')}
                                </Button>
                            </div> : ''
                    }

                    <Input
                        // label={t('form:input-label-name')}
                        label={`Barcode No.`}
                        {...register('barcodeNo')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.barcodeNo?.message!)}
                        />

                    <Input
                        // label={t('form:input-label-name')}
                        label={`Product Name`}
                        {...register('productName', {
                            required: true
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.productName?.message!)}
                        />

                    <Input
                        // label={t('form:input-label-name')}
                        label={`Supplier Name`}
                        {...register('supplierName', {
                            required: true,
                            maxLength: 20,
                            pattern: /^[A-Za-z]+$/i
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.supplierName?.message!)}
                        />

                    <Input
                        // label={t('form:input-label-name')}
                        label={`Design Number`}
                        {...register('designNumber', {
                            required: true,
                            maxLength: 20,
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.designNumber?.message!)}
                        />

                    <Input
                        // label={t('form:input-label-name')}
                        label={`Size/Weight`}
                        {...register('sizeWeight', {
                            required: true,
                            maxLength: 20,
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.sizeWeight?.message!)}
                        />

                    <Input
                        // label={t('form:input-label-name')}
                        label={`Available Qty`}
                        {...register('availableQty', {
                            required: true,
                            maxLength: 20,
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.availableQty?.message!)}
                        />

                    <Input
                        // label={t('form:input-label-name')}
                        label={`Purchase Price`}
                        {...register('purchasePrice', {
                            required: true,
                            maxLength: 20,
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.purchasePrice?.message!)}
                        />

                    <Input
                        // label={t('form:input-label-name')}
                        label={`Sale Price`}
                        {...register('salePrice', {
                            required: true,
                            maxLength: 20,
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.salePrice?.message!)}
                        />

                    <div className="text-end mb-5">
                        <Button type='button' className='mr-2'>
                            {formActionType === "edit"
                            ? t('Make Duplicate @')
                            : t('Make Duplicate')}
                        </Button>

                        <Button type='button' className='mr-2'>
                            {formActionType === "edit"
                            ? t('Print Barcode @')
                            : t('Print Barcode')}
                        </Button>

                        {formActionType === "create" && <Button type='button' className='mr-2'>{t('Draft')}</Button>}

                        <Button type='submit'>
                            {formActionType === "edit"
                            ? t('form:button-label-update')
                            : t('form:button-label-save')}
                        </Button>
                    </div>

                </Card>
            </form>

            



        </>
    )
};

export default PosForm;

