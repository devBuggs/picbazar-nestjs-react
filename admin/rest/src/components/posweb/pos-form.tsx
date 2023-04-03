import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import Label from '@/components/ui/label';
import SelectInput from '../ui/select-input';
import React, { useState } from 'react';

import { useRouter } from 'next/router';

type FormValues = {
    barcodeNo: number;
    productName: string;
    supplierName: string;
    designNumber: number;
    sizeWeight: number;
    sizeWeightUnit: object;
    brandManufacturer: string;
    status: boolean;
    draft: boolean;
    availableQuantity: number;
    purchasePrice: number;
    salePrice: number;
};

type PosFormTypes = { 
    createNewProduct?: any, 
    updateExistingProduct?: any, 
    makeDuplicate?: any, 
    printBarcode?: any, 
    saveToDraft?: any, 
    scanBarcode?: any, 
    stateFlag: {
        printBarcodeFg?: boolean,
        makeDuplicateFg?: boolean,
        inputBarcodeRef?: any,
        barcodeData?: any,
        editPosAction?: boolean,
        formData?: object,
    },
    setStateFlag: any,
    formHook: any
}

const PosForm = ({ 
        createNewProduct,
        updateExistingProduct,
        makeDuplicate,
        printBarcode,
        saveToDraft,
        scanBarcode,
        stateFlag,
        setStateFlag,
        formHook,
    }: PosFormTypes) => {

    const router = useRouter();
    const [actionType] = useState(router?.query?.action);


    const {
        register,
        handleSubmit,
        errors,
        getValues,
        control,
        unitOptions
    } = formHook;

    const onSubmit: SubmitHandler<FormValues> = async (getValues) => createNewProduct(getValues);
    const onSubmitUpdate: SubmitHandler<FormValues> = async (getValues) => updateExistingProduct(getValues);
    
    const { t } = useTranslation();

    console.log("@@===> ", stateFlag?.printBarcodeFg, "===> ", stateFlag?.formData.id );
    

    return (
        <>
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 ">
                <Description
                    title={t('Product Information')}
                    details={t('Fill out the basic product information.')}
                    className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
                />

                <form className="w-full sm:w-8/12 md:w-3/3" onSubmit={(e) => e.preventDefault() }>
                    <Card >
                        {
                            (stateFlag?.printBarcodeFg === true) || (stateFlag?.formData?.id !== null) ? <svg ref={stateFlag?.barcodeData} id="barcode"></svg> : ""
                        }

                        <div>
                            <Input
                                label={t('Barcode No.')}
                                {...register('barcodeNo', {
                                    required: true,
                                })}
                                variant="outline"
                                className="mb-5"
                                disabled={true}
                                error={t(errors.barcodeNo?.message!)}
                                />
                            {errors?.barcodeNo?.type === "required" && <p>This field is required</p>}
                        </div>

                        <Input
                            label={t('Product Name')}
                            {...register('productName', {
                                required: true
                            })}
                            variant="outline"
                            className="mb-5"
                            error={t(errors.productName?.message!)}
                            />
                        {errors?.productName?.type === "required" && <p>This field is required</p>}

                        <div>
                            <Input
                                label={t('Supplier Name')}
                                {...register('supplierName', {
                                    required: true
                                })}
                                variant="outline"
                                className="mb-5"
                                error={t(errors.supplierName?.message!)}
                                />
                            {errors?.supplierName?.type === "required" && <p>This field is required</p>}
                        </div>

                        <Input
                            label={t('Design Number')}
                            {...register('designNumber', {
                                required: true
                            })}
                            variant="outline"
                            className="mb-5"
                            error={t(errors.designNumber?.message!)}
                            />

                        <div className="flex flex-row">
                            <Input
                                className="flex-grow mr-2"
                                label={t('Size/Weight')}
                                {...register('sizeWeight', {
                                    required: true
                                })}
                                variant="outline"
                                // className="mb-5 flex-grow"
                                error={t(errors.sizeWeight?.message!)}
                                />

                            <div className="sm:col-span-2 ml-2">
                                <Label>{t('Unit')}</Label>
                                <SelectInput
                                    name={'unit'}
                                    control={control}
                                    options={unitOptions}
                                    {...register('sizeWeightUnit', {
                                        required: true
                                    })}
                                    isClearable={true}
                                    defaultValue={unitOptions.sizeWeightUnit}
                                    // error={t(errors.sizeWeightUnit?.message!)}
                                    />
                            </div>
                        </div>

                        <div>
                            <Input
                                label={t('Brand / Manufacturer')}
                                {...register('brandManufacturer', {
                                    required: true
                                })}
                                variant="outline"
                                className="mb-5 mt-5"
                                error={t(errors.brandManufacturer?.message!)}
                                />
                            {errors?.brandManufacturer?.type === "required" && <p>This field is required</p>}
                        </div>

                        <Input
                            label={t('Available Quantity')}
                            {...register('availableQuantity', {
                                required: true
                            })}
                            variant="outline"
                            className="mb-5 mt-5"
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
                            <Button type='button' disabled={ stateFlag?.makeDuplicateFg ? false : true} className='mr-2' onClick={makeDuplicate}>
                                {actionType === "edit"
                                ? t('Make Duplicate')
                                : t('Make Duplicate')}
                            </Button>

                            <Button 
                                type='button' 
                                disabled={stateFlag?.printBarcodeFg ? false : true} 
                                className='mr-2' 
                                onClick={printBarcode}>
                                {t('Print Barcode')}
                            </Button>

                            <Button type='button' className='mr-2' onClick={() => console.log("Add New Button Clicked!!!")}>
                                {actionType === "edit"
                                ? t('Add New')
                                : t('Add New')}
                            </Button>

                            {actionType === "create" && <Button type='button' onClick={saveToDraft} className='mr-2'>{t('Draft')}</Button>}

                            {actionType === "edit"
                                ? <Button type='submit' onClick={handleSubmit(onSubmitUpdate)}>{t('form:button-label-update')}</Button>
                                : <Button type='submit' onClick={handleSubmit(onSubmit)}>{t('form:button-label-save')}</Button>
                            }

                        </div>
                    </Card>
                </form>
            </div>
            
            
        </>
    )
};

export default PosForm;

