import { useRef } from "react";
import Input from "@/components/ui/input";
import * as yup from "yup";
import Card from "@/components/common/card";
import Button from "@/components/ui/button";
import FileInput from "@/components/ui/file-input";
const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

export default function SupplierInfo({ formStep, nextFormStep }: { formStep: any, nextFormStep: any }) {
  const formRef = useRef();

  async function handleSubmit(data: any) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      nextFormStep();
    } catch (err) {
      const errors = {};
      if (err instanceof yup.ValidationError) {
        console.error(err.inner);
      }
    }
  }

    return (
        <Card className={`${formStep === 0 ? 'd-block' : 'd-none'}`}>
            <h2 className="mb-5">Upload Gallery Image</h2>
            <form onSubmit={formStep += 1}>
                <Card className="w-full mb-5 sm:w-8/12 md:w-2/3">
                    <div className="w-full flex items-center flex-col">
                        <div className="flex bg-white shadow-md p-4 rounded-md">
                            <div data-placeholder className="mr-2 h-20 w-20 rounded-full overflow-hidden relative bg-gray-200"></div>
                            <div className="flex flex-col justify-between">
                                <div data-placeholder className="mb-2 h-5 w-40 overflow-hidden relative bg-gray-200"></div>
                                <div data-placeholder className="h-10 w-40 overflow-hidden relative bg-gray-200"></div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="flex flex-row-reverse justify-between">
                    {/* <Button>Back</Button> */}
                    <Button type="submit">Next</Button>
                </div>
            </form>
        </Card>
    );
}
