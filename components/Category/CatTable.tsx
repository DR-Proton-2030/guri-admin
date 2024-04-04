import { Table } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Box } from "../styles/box";
import axios from "axios";
import { Loader } from "../table/loader/Loader";
import { deleteCategory } from "../../pages/api/category";

export const CatTable = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { name: "Category", uid: "category" },
        { name: "Active Status", uid: "is_active" },
        { name: "Edit Status", uid: "edit_status" },
        { name: "Delete", uid: "delete" },
    ];

    const getBusiness = async () => {
        try {
            setLoading(true);
            const result = await axios.get(
                "https://stingray-app-zclxo.ondigitalocean.app/api/v1/category/getCategory"
            );
            setBusinesses(result.data.result);
        } catch (error) {
            console.error("Error fetching business data:", error);
        } finally {
            setLoading(false);
        }
    };

    const API_BASE_URL =
        "https://stingray-app-zclxo.ondigitalocean.app/api/v1/category/";

    const handleStatusChange = async (id: number, currentStatus: string) => {
        try {
            setLoading(true);
            const is_active =
                currentStatus === "Active" ? "Inactive" : "Active";
            await axios.patch(API_BASE_URL + "editCatgory", {
                is_active,
            });
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setLoading(false);
        }
    };

    const handledeleteCategory = async ({ _id }: any) => {
        try {
            setLoading(true);
            const response = await deleteCategory(_id);
            getBusiness();
        } catch (error) {
            console.error("Error editing category:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBusiness();
    }, []);
    return (
        <Box>
            {loading ? (
                <Loader />
            ) : (
                <Table>
                    <Table.Head>
                        {columns.map((column) => (
                            <Table.Header key={column.uid}>
                                {column.name}
                            </Table.Header>
                        ))}
                    </Table.Head>
                    <Table.Body>
                        {businesses.map((business) => (
                            <Table.Row key={business._id}>
                                <Table.Cell>{business.category}</Table.Cell>
                                <Table.Cell>{business.is_active}</Table.Cell>
                                <Table.Cell>
                                    <button
                                        onClick={() =>
                                            handleStatusChange(
                                                business._id,
                                                business.is_active
                                            )
                                        }
                                    >
                                        {business.is_active === "Active"
                                            ? "Deactivate"
                                            : "Activate"}
                                    </button>
                                </Table.Cell>
                                <Table.Cell>
                                    <button
                                        onClick={() =>
                                            handledeleteCategory(business._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}
        </Box>
    );
};
