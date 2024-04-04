import axios from "axios";
export interface Business {
    _id: string;
    name: string;
    location: string;
    createdAt: string;
    status: string;
    actions: string[];
}

const API_BASE_URL =
    "https://stingray-app-zclxo.ondigitalocean.app/api/v1/category/";

export const createCategory = async (category: any, is_active: boolean) => {
    try {
        // @ts-ignore
        // eslint-disable-next-line
        const response = await axios.post<{ result: category }>(
            API_BASE_URL + "createCategory",
            {
                category,
                is_active,
            }
        );
        return response.data.result;
    } catch (error) {
        console.error("Error updating  status:", error);
        throw error;
    }
};
export const getCategory = async () => {
    try {
        const response = await axios.get<{ result: any }>(
            API_BASE_URL + "getCategory"
        );
        return response.data.result;
    } catch (error) {
        console.error("Error updating  status:", error);
        throw error;
    }
};

export const editCategory = async (_id: string, is_active: boolean) => {
    try {
        await axios.patch(API_BASE_URL + "editCategory/" + `${_id}`, {
            is_active,
        });
    } catch (error) {
        console.error("Error edit Category:", error);
        throw error;
    }
};

export const deleteCategory = async (_id: string) => {
    try {
        await axios.delete(API_BASE_URL + "deleteCategory/" + `${_id}`);
    } catch (error) {
        console.error("Error deleting Category:", error);
        throw error;
    }
};
