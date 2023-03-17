

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Controller, useFieldArray, useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import FileInput from '@/components/ui/file-input';
import TextArea from '@/components/ui/text-area';
// import { posValidationSchema } from './pos-validation-schema';
import { getFormattedImage } from '@/utils/get-formatted-image';
import { useCreateShopMutation, useUpdateShopMutation } from '@/data/shop';
// import { useCreatePosProductMutation, useUpdatePosProductMutation } from '@/data/posweb';
import {
  BalanceInput,
  ShopSettings,
  ShopSocialInput,
  UserAddressInput,
} from '@/types';
import GooglePlacesAutocomplete from '@/components/form/google-places-autocomplete';
import Label from '@/components/ui/label';
import { getIcon } from '@/utils/get-icon';
import SelectInput from '@/components/ui/select-input';
import * as socialIcons from '@/components/icons/social';
import omit from 'lodash/omit';

import { useRouter } from 'next/router';
// import { ErrorMessage } from "@hookform/error-message";
import React from 'react';
// import FormCard from './FormComponent/FormCard';
// import FormCompleted from './FormComponent/FormCompleted';
// import {
//     BillingInfo,
//     ConfirmPurchase,
//     PersonalInfo,
//     GalleryImage,
//     MediaContent,
//     ProductInfo,
//     SupplierInfo,
//     PreviewProduct
// } from "./FormComponent/Forms";
import MultiStep from 'react-multistep';


import '../../assets/css/pos_web/prog-style.module.css';
import '../../assets/css/pos_web/prog-track.module.css';

type FormValues = {
    barcodeNo: number;
    productName: string;
    productDescription: string;
    // designNumber: number;
    sizeWeight: number;
    // availableQty: number;
    // purchasePrice: number;
    // salePrice: number;
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
    console.log("formActionType == ", router?.query?.action);

    const [formStep, setFormStep] = React.useState(1);

    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);


    return (
        <>
            <Card className='mb-5'>
                <h3 className='text-xl'>POS TO WEB Convert</h3>
            </Card>
            
            <Card>
                <MultiStep showNavigation={true}  >
                    <StepOne title='StepOne'/>
                    <StepTwo title='StepTwo'/>
                    {/* <StepThree title='StepThree'/> */}
                    <StepFour title='StepFour'/>
                    <StepFive title='StepFive'/>
                </MultiStep>
            </Card>
        </>
    )
};

export default PosForm;




const StepOne = ({title}: {title: string}) => {

    const { t } = useTranslation();

    return (
        <>
            {/* <h3>Upload Gallery Image</h3> */}
            {/* <hr/> */}
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('Product Gallery Image')}
                    details={t('Upload your product image here')}
                    className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    {/* <FileInput name="logo"  multiple={false} /> */}
                    <p className=''>Click to select image</p>
                </Card>
            </div>
        </>
    )
}

const StepTwo = ({title}: {title: string}) => {

    const { t } = useTranslation();
    
    return (
        <>
            {/* <h3>Upload More Images / Video</h3>
            <hr /> */}

            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('Product Gallery Image')}
                    details={t('Upload your product image here')}
                    className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3 flex flex-row">
                    {/* <FileInput name="logo"  multiple={false} /> */}
                    <p className='p-5'>Click to select image</p>
                    <p className='p-5'>Click to select image</p>
                    <p className='p-5'>Click to select image</p>
                </Card>
            </div>
        </>
    )
}

const StepThree = ({title}: {title: string}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        control
    } = useForm<FormValues>();
    const { t } = useTranslation();

    return (
        <>
            <h3>Product Information</h3>
            <hr />
            <Card className="w-full sm:w-12/12 md:w-3/3">
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
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />

                <Input
                    // label={t('form:input-label-name')}
                    label={`Product Description`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />

                <Input
                    // label={t('form:input-label-name')}
                    label={`Size / Weight`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />

            </Card>
        </>
    )
}

const StepFour = ({title}: {title: string}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        control
    } = useForm<FormValues>();
    const { t } = useTranslation();

    return (
        <>
            <h3>Product Details</h3>
            <hr />
            <Card className="w-full sm:w-12/12 md:w-3/3">
                <Input
                    // label={t('form:input-label-name')}
                    label={`Supplier Name`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />

                <Input
                    // label={t('form:input-label-name')}
                    label={`Design Number`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />

                <div className="flex flex-row">
                    <Input
                        // label={t('form:input-label-name')}
                        label={`Width`}
                        {...register('barcodeNo')}
                        variant="outline"
                        className="mb-5 w-full"
                        error={t(errors.barcodeNo?.message!)}
                        />

                    <Input
                        // label={t('form:input-label-name')}
                        label={`Height`}
                        {...register('barcodeNo')}
                        variant="outline"
                        className="mb-5 w-full"
                        error={t(errors.barcodeNo?.message!)}
                        />
                </div>

                

                <Input
                    // label={t('form:input-label-name')}
                    label={`Brand / Manufacturer`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />

                <Input
                    // label={t('form:input-label-name')}
                    label={`Available Quantity`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />
                
                <Input
                    // label={t('form:input-label-name')}
                    label={`Purchase Price`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />
                
                <Input
                    // label={t('form:input-label-name')}
                    label={`Sale Price`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />

            </Card>
        </>
    )
}

const StepFive = ({title}: {title: string}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        control
    } = useForm<FormValues>();
    const { t } = useTranslation();

    return (
        <>
            <h3>Final Submission</h3>
            <hr />
            <Card className="w-full sm:w-12/12 md:w-3/3">
                <Input
                    // label={t('form:input-label-name')}
                    label={`Tags`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />

                <Input
                    // label={t('form:input-label-name')}
                    label={`Barcode Number`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />

                <Input
                    // label={t('form:input-label-name')}
                    label={`Search From List`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />

                <Input
                    // label={t('form:input-label-name')}
                    label={`Category`}
                    {...register('barcodeNo')}
                    variant="outline"
                    className="mb-5"
                    error={t(errors.barcodeNo?.message!)}
                    />


                {/* <Card> */}
                    <Button type='button' className='mr-2'>
                        {t('Save & Publish')}
                    </Button>

                    <Button type='button' className='mr-2'>
                        {t('Save to Draft')}
                    </Button>

                    <Button type='button' className='mr-2'>
                        {t('Print Barcode')}
                    </Button>

                    <Button type='button' className='mr-2'>
                        {t('Make Duplicate')}
                    </Button>
                {/* </Card> */}


            </Card>
        </>
    )
}