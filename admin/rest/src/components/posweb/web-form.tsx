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
import FormCard from './FormComponent/FormCard';
import FormCompleted from './FormComponent/FormCompleted';
import {
    BillingInfo,
    ConfirmPurchase,
    PersonalInfo,
    GalleryImage,
    MediaContent,
    ProductInfo,
    SupplierInfo,
    PreviewProduct
} from "./FormComponent/Forms";


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
    console.log("formActionType == ", router?.query?.action);

    const [formStep, setFormStep] = React.useState(5);

    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    


    return (
        <>
            <Card className='mb-5'>
                {
                    formActionType === "create" ? <h3 className='text-xl'>WEB PRODUCT ENTRY</h3> : <h3 className='text-xl'>EDIT WEB PRODUCT ENTRY</h3>
                }
            </Card>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
                    {formStep == 0 && (
                    <GalleryImage formStep={formStep} nextFormStep={nextFormStep} />
                    )}
                    {formStep == 1 && (
                    <MediaContent formStep={formStep} nextFormStep={nextFormStep} />
                    )}
                    {formStep == 2 && (
                    <ProductInfo formStep={formStep} nextFormStep={nextFormStep} />
                    )}

                    {formStep == 3 && (
                    <SupplierInfo formStep={formStep} nextFormStep={nextFormStep} />
                    )}

                    {formStep == 4 && (
                    <PreviewProduct formStep={formStep} nextFormStep={nextFormStep} />
                    )}

                    {formStep > 4 && <FormCompleted />}
                </FormCard>
            </form>

        </>
    )
};

export default PosForm;

