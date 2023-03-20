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
// import {PosInitialValues } from '@/types';
import SelectInput from '../ui/select-input';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { unitOptions, newProduct, existingProduct } from '@/utils/constants/pos-web';

type FormValues = {
    barcodeNo: number;
    productName: string;
    supplierName: string;
    designNumber: number;
    sizeWeight: number;
    sizeWeightUnit: object;
    availableQuantity: number;
    purchasePrice: number;
    salePrice: number;
};

const PosForm = ({ createNewProduct, updateExistingProduct, makeDuplicate, generateBarCode, printBarcode, saveToDraft }: { createNewProduct?: any, updateExistingProduct?: any, makeDuplicate?: any, generateBarCode?: any, printBarcode?: any, saveToDraft?: any }) => {

    const router = useRouter();
    const [actionType] = useState(router?.query?.action);
    const [defaultValues] = useState( actionType === "edit" ? existingProduct : newProduct )

    console.warn("POS form action :: ", actionType, "\nInitial Values :: ", defaultValues);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        control
    } = useForm<FormValues>({defaultValues});

    const onSubmit: SubmitHandler<FormValues> = data => console.log("=>>>>>>>>", data);
    
    const { t } = useTranslation();

    return (
        <>
            <Card className='mb-5'>
                {
                    actionType === "create" ? <h3 className='text-xl'>POS PRODUCT ENTRY</h3> : <h3 className='text-xl'>EDIT POS PRODUCT ENTRY</h3>
                }
            </Card>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="w-full sm:w-8/12 md:w-2/3">
                    {
                        actionType === "edit" ? 
                            <div className="text-end mb-5">
                                <Button>
                                    {t('Scan Barcode')}
                                </Button>
                            </div> : '' 
                    }

                    <Input
                        label={t('Barcode No.')}
                        {...register('barcodeNo')}
                        variant="outline"
                        className="mb-5"
                        disabled={true}
                        error={t(errors.barcodeNo?.message!)}
                        />

                    <Input
                        label={t('Product Name')}
                        {...register('productName', {
                            required: true
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.productName?.message!)}
                        />

                    <Input
                        label={t('Supplier Name')}
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
                        label={t('Design Number')}
                        {...register('designNumber', {
                            required: true,
                            maxLength: 20,
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.designNumber?.message!)}
                        />

                    <div className="flex flex-">
                        <Input
                            label={t('Size/Weight')}
                            {...register('sizeWeight', {
                                required: true,
                                maxLength: 20,
                            })}
                            variant="outline"
                            className="mb-5 flex-grow"
                            error={t(errors.sizeWeight?.message!)}
                            />

                        <div className="sm:col-span-2">
                            <Label>{t('Unit')}</Label>
                            <SelectInput
                                name={'unit'}
                                control={control}
                                options={unitOptions}
                                isClearable={true}
                                defaultValue={defaultValues.sizeWeightUnit}
                                // error={t(errors.sizeWeightUnit?.message!)}
                                />
                        </div>
                    </div>

                    <Input
                        label={t('Available Quantity')}
                        {...register('availableQuantity', {
                            required: true,
                            maxLength: 20,
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.availableQuantity?.message!)}
                        />

                    <Input
                        label={t('Purchase Price')}
                        {...register('purchasePrice', {
                            required: true,
                            maxLength: 20,
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.purchasePrice?.message!)}
                        />

                    <Input
                        label={t('Sale Price')}
                        {...register('salePrice', {
                            required: true,
                            maxLength: 20,
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.salePrice?.message!)}
                        />

                    <div className="text-end mb-5">
                        <Button type='button' className='mr-2' onClick={makeDuplicate}>
                            {actionType === "edit"
                            ? t('Make Duplicate')
                            : t('Make Duplicate')}
                        </Button>

                        <Button type='button' className='mr-2' onClick={printBarcode}>
                            {actionType === "edit"
                            ? t('Print Barcode')
                            : t('Print Barcode')}
                        </Button>

                        <Button type='button' className='mr-2' onClick={() => console.log("Add New Button Clicked!!!")}>
                            {actionType === "edit"
                            ? t('Add New')
                            : t('Add New')}
                        </Button>

                        {actionType === "create" && <Button type='button' onClick={saveToDraft} className='mr-2'>{t('Draft')}</Button>}

                        {actionType === "edit"
                            ? <Button type='submit' onClick={updateExistingProduct}>{t('form:button-label-update')}</Button>
                            : <Button type='submit' onClick={createNewProduct}>{t('form:button-label-save')}</Button>
                        }

                    </div>
                </Card>
            </form>
        </>
    )
};

export default PosForm;

