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

// import MediaFileInput from "@/components/posweb/component/common/MediaFileInput";

import '../../assets/css/pos_web/prog-style.module.css';
import '../../assets/css/pos_web/prog-track.module.css';
import '../../assets/css/pos_web/custom-style.module.css';
import MultiStep from 'react-multistep';
import { unitOptions, newWebProduct, existingWebProduct } from '@/utils/constants/pos-web';
import { useState } from 'react';
import Search from '../common/search';


type FormValues = {
    barcodeNo: number;
    productImage: any;
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

type PosFormTypes = { 
    createNewProduct?: any, 
    updateExistingProduct?: any, 
    printBarcode?: any, 
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

type StepFormTypes = {
    title: string;
    control: any;
    actionType: any;
    register: any;
    errors: any;
    stateFlag: any;
    setStateFlag: any;
    handleSubmit: any; 
    onSubmitUpdate: any;
    onSubmit: any;
    printBarcode: any;
    watch: any;
}

const WebForm = ({ 
    createNewProduct,
    updateExistingProduct,
    printBarcode,
    stateFlag,
    setStateFlag,
    formHook, }: PosFormTypes) => {

    const router = useRouter();
    const [actionType] = useState(router?.query?.action);
    const [defaultValues] = useState( actionType === "edit" ? existingWebProduct : newWebProduct )


    const {
        register,
        handleSubmit,
        errors,
        getValues,
        control,
        watch
    } = formHook;

    const onSubmit: SubmitHandler<FormValues> = async (getValues) => createNewProduct(getValues);
    const onSubmitUpdate: SubmitHandler<FormValues> = async (getValues) => updateExistingProduct(getValues);
    
    const { t } = useTranslation();

    React.useEffect(() => {
        const prevBtnStyle = `color: #ffffff; background: #009F7F; margin: 0px 15px; padding: 0px 20px; width: 120px; border: 1px solid #009f7f; border-radius: 5%; height: 48px;`
        const nextBtnStyle = `color: #ffffff; background: #009F7F; margin: 0px 15px; padding: 0px 20px; width: 120px; border: 1px solid #009f7f; border-radius: 5%; height: 48px; float: right;`
        document.getElementsByTagName('form')[0][1].setAttribute('style', prevBtnStyle);
        document.getElementsByTagName('form')[0][2].setAttribute('style', nextBtnStyle);
    }, [actionType]);

    return (
        <>
            <Card>
                {
                    stateFlag?.printBarcodeFg === true ? <svg ref={stateFlag?.barcodeData} id="barcode"></svg> : ""
                }

                <form className={'web-product'} onSubmit={handleSubmit(onSubmit)}>
                    <MultiStep showNavigation={true} activeStep={0} showTitles={true} >
                        <StepOne 
                            title='StepOne' 
                            control={control} 
                            actionType={actionType} 
                            register={register} 
                            errors={errors} 
                            stateFlag={stateFlag} 
                            setStateFlag={setStateFlag}
                            handleSubmit = {handleSubmit} 
                            onSubmitUpdate = {onSubmitUpdate} 
                            onSubmit={onSubmit}
                            printBarcode={printBarcode}
                            watch={watch}
                            />
                        <StepTwo 
                            title='StepTwo' 
                            control={control} 
                            actionType={actionType} 
                            register={register} 
                            errors={errors} 
                            stateFlag={stateFlag} 
                            setStateFlag={setStateFlag}
                            handleSubmit = {handleSubmit} 
                            onSubmitUpdate = {onSubmitUpdate} 
                            onSubmit={onSubmit}
                            printBarcode={printBarcode}
                            watch={watch}
                            />
                        <StepThree 
                            title='StepThree' 
                            control={control} 
                            actionType={actionType} 
                            register={register} 
                            errors={errors} 
                            stateFlag={stateFlag} 
                            setStateFlag={setStateFlag}
                            handleSubmit = {handleSubmit} 
                            onSubmitUpdate = {onSubmitUpdate} 
                            onSubmit={onSubmit}
                            printBarcode={printBarcode}
                            watch={watch}
                            />
                        <StepFour 
                            title='StepFour' 
                            control={control} 
                            actionType={actionType} 
                            register={register} 
                            errors={errors} 
                            stateFlag={stateFlag} 
                            setStateFlag={setStateFlag}
                            handleSubmit = {handleSubmit} 
                            onSubmitUpdate = {onSubmitUpdate} 
                            onSubmit={onSubmit}
                            printBarcode={printBarcode}
                            watch={watch}
                            />
                        <StepFive 
                            title='StepFive' 
                            control = {control} 
                            actionType = {actionType} 
                            register = {register} 
                            errors = {errors} 
                            stateFlag = {stateFlag} 
                            setStateFlag = {setStateFlag}
                            handleSubmit = {handleSubmit} 
                            onSubmitUpdate = {onSubmitUpdate} 
                            onSubmit={onSubmit}
                            printBarcode={printBarcode}
                            watch={watch}
                            />
                    </MultiStep>
                </form>
            </Card>
        </>
    )
};

export default WebForm;

const StepOne = ({title, control, actionType, register, errors, stateFlag, setStateFlag, watch}: StepFormTypes) => {
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
                            {...register('barcodeNo', {
                                required: true
                            })}
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
                        {...register('productImage', {
                            required: false
                        })}
                        name="productImage" 
                        multiple={false} 
                        error={t(errors.productImage?.message!)}
                        accept={'image/*'}
                        onChange={(data:any) => {
                            console.log("stateFlag ==> ", stateFlag, "\narg:: ", data);
                            setStateFlag({...stateFlag, formData: {...stateFlag.formData, productGallery: data} })
                        }}
                        />
                    {errors?.productImage?.type === "required" && <p>This field is required</p>}
                    {/* <input 
                        type="file" 
                        name={'productImage'} 
                        id={'input-productImage'} 
                        {...register('productImage', {
                            required: true
                        })}
                        accept={'image/*'}
                        multiple={false} required />
                    {errors?.productImage?.type === "required" && <p>This field is required</p>} */}
                </Card>
            </div>
        </>
    )
}

const StepTwo = ({title, control, actionType, register, errors, stateFlag, setStateFlag}: StepFormTypes) => {
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
                        {...register('productMediaItems', {
                            required: false
                        })}
                        onChange={(data:any) => {
                            console.log("uploaded action ", data);
                            setStateFlag({...stateFlag, formData: {...stateFlag.formData, productGallery: data} })
                        }}
                        error={t(errors.productMediaItems?.message!)}
                        />
                </Card>
            </div>
        </>
    )
}

const StepThree = ({title, control, actionType, register, errors, stateFlag, setStateFlag}: StepFormTypes) => {
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
                        {...register('barcodeNo', {
                            required: true
                        })}
                        variant="outline"
                        className="mb-5"
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
                        label={t('Product Description')}
                        {...register('productDescription', {
                            required: true
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.productDescription?.message!)}
                        />

                    <div className="flex flex-">
                        <Input
                            label={t('Size/Weight')}
                            {...register('productSizeWeight', {
                                required: true
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
                                {...register('productSizeWeightUnit', {
                                    required: true
                                })}
                                error={t(errors.productSizeWeightUnit?.message!)}
                                />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

const StepFour = ({title, control, actionType, register, errors, stateFlag, setStateFlag}: StepFormTypes) => {
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
                        {...register('supplierName', {
                            required: true
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.supplierName?.message!)}
                        />

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
                            label={t('Width')}
                            {...register('width', {
                                required: false
                            })}
                            variant="outline"
                            className="mb-5 w-full mr-1"
                            error={t(errors.width?.message!)}
                            />

                        <Input
                            label={t('Height')}
                            {...register('height', {
                                required: false
                            })}
                            variant="outline"
                            className="mb-5 w-full ml-1"
                            error={t(errors.height?.message!)}
                            />
                    </div>

                    {/* <Input
                        label={t('Brand / Manufacturer')}
                        {...register('brandMenufacturer', {
                            required: true
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.brandMenufacturer?.message!)}
                        /> */}

                        <div className='flex flex-row'>
                            {/* <div className="flex-grow mr-1 mb-5">
                                <Label>{t('Brand/Manufacturer')}</Label>
                                <SelectInput
                                    name={'brandMenufacturer'}
                                    control={control}
                                    options={unitOptions}
                                    isClearable={true}
                                    {...register('brandMenufacturer', {
                                        required: true
                                    })}
                                    error={t(errors.brandMenufacturer?.message!)}
                                    />
                            </div> */}

                            <Input
                                label={t('Brand / Manufacturer')}
                                {...register('brandMenufacturer', {
                                    required: true
                                })}
                                variant="outline"
                                className="mb-5"
                                error={t(errors.brandMenufacturer?.message!)}
                                />

                            <div className='sm:col-span-2 ml-1'>
                                <Label>{t('Add Brand')}</Label>
                                <Button>Add +</Button>
                            </div>

                        </div>

                    <div className="flex flex-row">
                        <Input
                            label={t('Available Quantity')}
                            {...register('availableQuantity', {
                                required: true
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
                                {...register('productQuantityUnit', {
                                    required: true
                                })}
                                error={t(errors.productQuantityUnit?.message!)}
                                />
                        </div>
                    </div>

                    <Input
                        label={t('Purchase Price')}
                        {...register('purchasePrice', {
                            required: true
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.purchasePrice?.message!)}
                        />

                    <Input
                        label={t('Sale Price')}
                        {...register('salePrice', {
                            required: true
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.salePrice?.message!)}
                        />
                </Card>
            </div>
        </>
    )
}

const StepFive = ({title, control, actionType, register, errors, stateFlag, setStateFlag, handleSubmit, onSubmitUpdate, onSubmit, printBarcode}: StepFormTypes) => {
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
                        {...register('tags', {
                            required: true
                        })}
                        variant="outline"
                        className="mb-5"
                        error={t(errors.tags?.message!)}
                        />

                    <div className="mb-5 w-full">
                        <SwitchInput 
                            label={t('Make As Variation')}
                            control={control}
                            name={'productVariation'}
                            {...register('variationFg', {
                                required: false
                            })}
                            error={t(errors.tag?.message!)}
                            />
                    </div>

                    <div className="flex flex-row ">
                        <Input
                            label={t('Barcode Number')}
                            {...register('barcodeNo', {
                                required: true
                            })}
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
                            {...register('category', {
                                required: true
                            })}
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
                        <Button type='button' className='mr-2' onClick={() => console.log("Add New Button Clicked!!!")}>
                            {actionType === "edit"
                            ? t('Add New')
                            : t('Add New')}
                        </Button>

                        {actionType === "create" && <Button type='button' onClick={() => console.log("Save product to draft button clicked!!!")} className='mr-2'>{t('Draft')}</Button>}

                        {actionType === "edit"
                            ? <Button type='submit' onClick={handleSubmit(onSubmitUpdate)}>{t('form:button-label-update')}</Button>
                            : <Button type='submit' onClick={handleSubmit(onSubmit)}>{t('form:button-label-save')}</Button>
                        }

                        <Button type='button' disabled={ stateFlag?.makeDuplicateFg ? false : true} className='mr-2' onClick={() => console.log("Make duplicate button clicked!!!.")}>
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
                    </div>
                </Card>
            </div>
        </>
    )
}