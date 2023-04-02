import axios from "axios";

const posProductsApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
})

export const getPosProducts = async () => {
    const response = await posProductsApi.get("/pos-products");
    return response.data;
}

export const createPosProduct = async (formData: any) => {
    return await posProductsApi.post("/pos-products", formData);
}

export const updatePosProduct = async (formData: any) => {
    return await posProductsApi.patch(`/pos-products/${formData?.id}`, formData);
}

export const deletePosProduct = async ({ id }: { id: string }) => {
    return await posProductsApi.delete(`/pos-products/${id}`, id);
}

export default posProductsApi;