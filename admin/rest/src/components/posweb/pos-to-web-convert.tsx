import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Controller, useFieldArray, useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import FileInput from '@/components/ui/file-input';
import { getFormattedImage } from '@/utils/get-formatted-image';
import { useCreateShopMutation, useUpdateShopMutation } from '@/data/shop';

import Label from '@/components/ui/label';
import SwitchInput from '@/components/ui/switch-input';
import { getIcon } from '@/utils/get-icon';
import SelectInput from '@/components/ui/select-input';
import * as socialIcons from '@/components/icons/social';
import omit from 'lodash/omit';
import { useRouter } from 'next/router';
import React from 'react';

import '../../assets/css/pos_web/prog-style.module.css';
import '../../assets/css/pos_web/prog-track.module.css';
import MultiStep from 'react-multistep';
import { unitOptions, newWebProduct, existingWebProduct } from '@/utils/constants/pos-web';
import { useState } from 'react';
import Search from '../common/search';


type FormValues = {
    barcodeNo: number;
    productGalleryImage: any;
    productMediaItems: any;
    productName: string;
    productDescription: string;
    productSizeWeight: number;
    productSizeWeightUnit: string;
    supplierName: string;
    designNumber: number;
    width: number;
    height: number;
    brandManufacturer: string;
    availableQuantity: number;
    productQuantityUnit: string;
    purchasePrice: number;
    salePrice: number;
    tags: string;
    variationFg: boolean;
    variationData: object;
    category: string;
};

type StepFormTypes = {
    title: string;
    control: any;
    actionType: any;
    register: any;
    errors: any;
}

const defaultValues = {
    barcodeNo: 5602000001,
    productName: "productName",
    productDescription: "dummy product",
    sizeWeight: 12,
    supplierName: "Bhagwan Singh",
    designNumber: 999902,
    width: 12,
    height: 22,
    brandManufacturer: "Ecorpin Corp.",
    availableQuantity: 2,
    purchasePrice: 999999,
    salePrice: 1000000,
    tags: "",
    category: "",
}

const PosToWebConvertForm = ({ initialValues }: { initialValues?: any }) => {

    const router = useRouter();
    const [actionType] = useState(router?.query?.action);
    const [defaultValues] = useState( actionType === "edit" ? existingWebProduct : newWebProduct )

    console.warn("WEB form action :: ", actionType, "\nInitial Values :: ", defaultValues);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        control
    } = useForm<FormValues>({});

    const onSubmit: SubmitHandler<FormValues> = data => console.log("=>>>>>", data);
    
    const { t } = useTranslation();

    return (
        <>
            <Card className='mb-5'>
                {
                    actionType === "create" ? <h3 className='text-xl'>WEB PRODUCT ENTRY</h3> : <h3 className='text-xl'>EDIT WEB PRODUCT ENTRY</h3>
                }
            </Card>
            
            <Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MultiStep showNavigation={true}  >
                        <StepOne title='StepOne' control={control} actionType={actionType} register={register} errors={errors} />
                        <StepTwo title='StepTwo' control={control} actionType={actionType} register={register} errors={errors} />
                        <StepThree title='StepThree' control={control} actionType={actionType} register={register} errors={errors} />
                        <StepFour title='StepFour' control={control} actionType={actionType} register={register} errors={errors} />
                        <StepFive title='StepFive' control={control} actionType={actionType} register={register} errors={errors} />
                    </MultiStep>
                </form>
            </Card>
        </>
    )
};

export default PosToWebConvertForm;

const StepOne = ({title, control, actionType, register, errors}: StepFormTypes) => {
    const { t } = useTranslation();
    return (
        <>
            {
                actionType === "edit" ? 
                <>
                    <div className="flex flex-row">
                        <Input
                            name='barcodeNo'
                            label={t('Barcode No')}
                            {...register('barcodeNo')}
                            variant="outline"
                            className="mb-5 w-2/3"
                            error={t(errors.barcodeNo?.message!)}
                            />
                        <Button
                            type='button' 
                            className='mr-2 w-1/3 my-auto ml-1' 
                            onClick={() => console.log("Scan Barcode button clicked.")}
                            >
                            {t('Scan Barcode')}
                        </Button>
                    </div>
                    <div className="flex flex-row mb-5">
                        <Search
                            shadow={true} 
                            onSearch={() => console.log("Search Button clicked!")} />
                    </div>
                </> : ''
            }

            <hr />

            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('Product Image')}
                    details={t('Upload your product image here.')}
                    className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <FileInput 
                        control={control} 
                        {...register('productGalleryImage')}
                        name="productGalleryImage" 
                        multiple={false} 
                        error={t(errors.productGalleryImage?.message!)}
                        />
                </Card>
            </div>
        </>
    )
}

const StepTwo = ({title, control, actionType, register, errors}: StepFormTypes) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('Product Media Gallery')}
                    details={t('Upload more product images and video. You can select multiple images and videos.')}
                    className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <FileInput 
                        control={control} 
                        name="logo"  
                        multiple={true} 
                        {...register('productMediaItems')}
                        error={t(errors.productMediaItems?.message!)}
                        />
                </Card>
            </div>
        </>
    )
}

const StepThree = ({title, control, actionType, register, errors }: StepFormTypes) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('Product Information')}
                    details={t('Fill out the basic product information.')}
                    className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('Barcode No.')}
                        {...register('barcodeNo')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.barcodeNo?.message!)}
                        />

                    <Input
                        label={t('Product Name')}
                        {...register('productName')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.productName?.message!)}
                        />

                    <Input
                        label={t('Product Description')}
                        {...register('productDescription')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.productDescription?.message!)}
                        />

                    <div className="flex flex-">
                        <Input
                            label={t('Size/Weight')}
                            {...register('productSizeWeight', {
                                required: true,
                                maxLength: 20,
                            })}
                            variant="outline"
                            className="mb-5 flex-grow mr-1"
                            error={t(errors.productSizeWeight?.message!)}
                            />

                        <div className="sm:col-span-2 ml-1">
                            <Label>{t('Unit')}</Label>
                            <SelectInput
                                name={'unit'}
                                control={control}
                                options={unitOptions}
                                isClearable={true}
                                {...register('productSizeWeightUnit')}
                                error={t(errors.productSizeWeightUnit?.message!)}
                                />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

const StepFour = ({title, control, actionType, register, errors}: StepFormTypes) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('Product Details')}
                    details={t('Fill out the product and associated details.')}
                    className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('Supplier Name')}
                        {...register('supplierName')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.supplierName?.message!)}
                        />

                    <Input
                        label={t('Design Number')}
                        {...register('designNumber')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.designNumber?.message!)}
                        />

                    <div className="flex flex-row">
                        <Input
                            label={t('Width')}
                            {...register('width')}
                            variant="outline"
                            className="mb-5 w-full mr-1"
                            error={t(errors.width?.message!)}
                            />

                        <Input
                            label={t('Height')}
                            {...register('height')}
                            variant="outline"
                            className="mb-5 w-full ml-1"
                            error={t(errors.height?.message!)}
                            />
                    </div>

                    <Input
                        label={t('Brand / Manufacturer')}
                        {...register('brandMenufacturer')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.brandMenufacturer?.message!)}
                        />

                    <div className="flex flex-row">
                        <Input
                            label={t('Available Quantity')}
                            {...register('availableQuantity', {
                                required: true,
                                maxLength: 20,
                            })}
                            variant="outline"
                            className="mb-5 flex-grow mr-1"
                            error={t(errors.availableQuantity?.message!)}
                            />

                        <div className="sm:col-span-2 ml-1">
                            <Label>{t('Unit')}</Label>
                            <SelectInput
                                name={'unit'}
                                control={control}
                                options={unitOptions}
                                isClearable={true}
                                {...register('productQuantityUnit')}
                                error={t(errors.productQuantityUnit?.message!)}
                                />
                        </div>
                    </div>

                    <Input
                        label={t('Purchase Price')}
                        {...register('purchasePrice')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.purchasePrice?.message!)}
                        />

                    <Input
                        label={t('Sale Price')}
                        {...register('salePrice')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.salePrice?.message!)}
                        />
                </Card>
            </div>
        </>
    )
}

const StepFive = ({title, control, actionType, register, errors}: StepFormTypes) => {
    const { t } = useTranslation();

    return (
        <>
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('Product Information')}
                    details={t('Fill out the basic product information.')}
                    className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('Tags')}
                        {...register('tags')}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.tags?.message!)}
                        />

                    <div className="mb-5 w-full">
                        <SwitchInput 
                            label={t('Make As Variation')}
                            control={control}
                            name={'productVariation'}
                            {...register('variationFg')}
                            error={t(errors.tag?.message!)}
                            />
                    </div>

                    <div className="flex flex-row ">
                        <Input
                            label={t('Barcode Number')}
                            {...register('barcodeNo')}
                            variant="outline"
                            className="mb-5 w-2/3 mr-1"
                            error={t(errors.barcodeNo?.message!)}
                            />

                        <Button 
                            type='button' 
                            className='mr-2 w-1/3 my-auto ml-1' 
                            onClick={() => console.log("Scan Barcode button clicked.")}
                            >
                            {t('Scan Barcode')}
                        </Button>
                    </div>

                    <div className="flex flex-row mb-5">
                        <Button 
                            type='button' 
                            disabled={true} 
                            className='mr-2 w-1/3 my-auto ml-1' 
                            onClick={() => console.log("Scan Barcode button clicked.")}
                            >
                            {t('Search From List')}
                        </Button>
                        <Search 
                            shadow={true} 
                            onSearch={() => console.log("Search Button clicked!")} 
                            />
                    </div>

                    <div className="flex flex-row ">
                        <Input
                            label={t('Category')}
                            {...register('category')}
                            variant="outline"
                            className="mb-5 w-2/3 mr-1"
                            error={t(errors.category?.message!)}
                            />

                        <Button 
                            type='button' 
                            className='mr-2 w-1/3 my-auto ml-1' 
                            onClick={() => console.log("Scan Barcode button clicked.")}>
                            {t('Add Category')}
                        </Button>
                    </div>

                    <hr/>

                    <div className='flex flex-row flex-wrap my-3'>
                        <Button type='button' className='mr-2 mb-2'>
                            {t('Add New')}
                        </Button>

                        <Button type='button' className='mr-2 mb-2'>
                            {t('Save & Publish')}
                        </Button>

                        <Button type='button' className='mr-2 mb-2'>
                            {t('Save to Draft')}
                        </Button>

                        <Button type='button' className='mr-2 mb-2'>
                            {t('Print Barcode')}
                        </Button>

                        <Button type='button' className='mr-2 mb-2'>
                            {t('Make Duplicate')}
                        </Button>
                    </div>

                </Card>
            </div>
        </>
    )
}