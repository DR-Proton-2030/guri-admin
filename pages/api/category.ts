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

export const createCategory = async (category: string, is_active: boolean) => {
  try {
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
    const response = await axios.get<{ result: category }>(
      API_BASE_URL + "getCategory"
    );
    return response.data.result;
  } catch (error) {
    console.error("Error updating  status:", error);
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
