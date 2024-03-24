import React, { useState, useEffect } from "react";
import { Button, Input, Text } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Flex } from "../styles/flex";
import { TableWrapper } from "../table/table";
import CreateCategory from "./createCategory/CreateCategory.tsx";
import { getCategory, deleteCategory } from "../../pages/api/category";

const Category = () => {
  const [data, setData] = useState([]);
  const [editedCategory, setEditedCategory] = useState({
    category: "",
    is_active: false,
  });

  const fetchData = async () => {
    try {
      const response = await getCategory();
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handledeleteCategory = async ({ _id }: any) => {
    try {
      const response = await deleteCategory(_id);
      fetchData();
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleEditCategory = (item) => {
    setEditedCategory({ category: item.category, is_active: item.is_active });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex
      css={{
        mt: "$5",
        px: "$6",
        "@sm": {
          mt: "$10",
          px: "$16",
        },
      }}
      justify={"center"}
      direction={"column"}
    >
      <Breadcrumbs>
        <Crumb>
          <HouseIcon />
          <Link href={"/"}>
            <CrumbLink href="#">Home</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>

        <Crumb>
          <UsersIcon />
          <CrumbLink href="#">Category</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>All Categories</Text>

      <CreateCategory fetchData={fetchData} />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Active Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.category}</td>
              <td>{item.is_active ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handledeleteCategory({ _id: item._id })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </button>{" "}
                {/* Edit Icon or Button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Flex>
  );
};

export default Category;
