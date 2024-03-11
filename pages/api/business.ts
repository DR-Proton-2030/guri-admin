import axios from "axios";
export interface Business {
  _id: string;
  name: string;
  location: string;
  createdAt: string;
  status: string;
  actions: string[];
}

const API_BASE_URL = "http://13.201.7.191:8989/api/v1/business/";

export const getFilteredBusinesses = async (status: string, page: number) => {
  try {
    const response = await axios.get<{ result: Business[]; total: number }>(
      API_BASE_URL + "getFilteredBusiness",
      {
        params: { status, page },
      }
    );
    return response.data.result; // Return both businesses and total count
  } catch (error) {
    console.error("Error fetching business data:", error);
    throw error;
  }
};

export const editBusiness = async (id: string, status: string) => {
  try {
    const response = await axios.patch<{ result: Business }>(
      API_BASE_URL + "editBusiness",
      {
        id,
        status,
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error updating business status:", error);
    throw error;
  }
};
export const editBusinessDetails = async (id: any, payload: any) => {
  try {
    const response = await axios.patch<{ result: Business }>(
      API_BASE_URL + `editBusinessDetailsById/${id}`,
      payload
    );
    return response.data.result;
  } catch (error) {
    console.error("Error updating business status:", error);
    throw error;
  }
};

export const deleteBusiness = async (id: string) => {
  try {
    await axios.delete(API_BASE_URL + "deleteBusiness", {
      data: { id },
    });
  } catch (error) {
    console.error("Error deleting business:", error);
    throw error;
  }
};
