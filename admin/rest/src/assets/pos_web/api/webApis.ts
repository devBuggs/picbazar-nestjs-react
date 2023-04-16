import axios from "axios";

const webProductsApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
})

export const getWebProductsQuery = async () => {
    const response = await webProductsApi.get("/web-products");
    return response.data;
}

export const createWebProduct = async (formData: any) => {
    return await webProductsApi.post("/web-products", formData);
}

export const updateWebProduct = async (formData: any) => {
    return await webProductsApi.patch(`/web-products/${formData?.id}`, formData);
}

export const deleteWebProduct = async ({ id }: { id: string }) => {
    return await webProductsApi.delete(`/web-products/${id}`, id);
}

export default webProductsApi;