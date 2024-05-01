import React, { useState, useEffect } from "react";
import { Button, Input, Table, Text } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Flex } from "../styles/flex";
// @ts-ignore
// eslint-disable-next-line
import CreateCategory from "./createCategory/CreateCategory.tsx";
import {
  getCategory,
  deleteCategory,
  editCategory,
} from "../../pages/api/category";
import { Loader } from "../table/loader/Loader";
import RenderCell from "./render-cell";
import { useSearchContext } from "../navbar/SearchContext";
import CategoryModal from "../modal/categoryModal/CategoryModal";

const Category = () => {
  const [data, setData] = useState([]);
  const [editedCategory, setEditedCategory] = useState({
    category: "",
    is_active: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const context = useSearchContext();
  const [editId, setEditId] = useState<string>("");
  const [editUser, setEditUser] = useState<any>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const { search, setSearch } = context;
  const [completion, setCompletion] = useState<boolean>(false);

  const API_BASE_URL =
    "https://stingray-app-zclxo.ondigitalocean.app/api/v1/category/";

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
    { name: "DELETE", uid: "delete" },
  ];

  //  FUNCTION FOR THE SEARCHING OF CATEGORIES//
  // const searchData = async () => {
  //     try {
  //         if (search.text) {
  //             setLoading(true);
  //             const response = await searchCategories("name", search.text);
  //             setData(response);
  //         } else {
  //             setLoading(true);
  //             const result = await getCategory();
  //             setData(result);
  //         }
  //     } catch (error) {
  //         console.log(error);
  //         throw error;
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getCategory();
      setData(response);
      setLoading(false);
      setCompletion(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStatusChange = async (_id: string, is_active: boolean) => {
    try {
      console.log(is_active);
      const response = await editCategory(_id, is_active);
      alert("Status has been changed");
      fetchData();
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleDelete = async ({ _id }: any) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmation) {
      console.log("Delete category");
      try {
        const response = await deleteCategory(_id);
        alert("Category has been deleted");

        // add confirmation here for the delete

        fetchData();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  useEffect(() => {
    if (completion) {
      fetchData();
    }
    console.log(completion);
  }, [completion]);

  useEffect(() => {
    fetchData();
  }, []);
  //FOR SEARCH FUNCTIONALITY//
  // useEffect(() => {
  //     searchData();
  // }, [search.text]);

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

      <CreateCategory fetchData={fetchData} setCompletion={setCompletion} />

      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Table
              aria-label="Example table with custom cells"
              css={{
                height: "auto",
                minWidth: "100%",
                boxShadow: "none",
                width: "100%",
                px: 0,
              }}
              // selectionMode="multiple"
            >
              <Table.Header columns={columns}>
                {(column: any) => (
                  <Table.Column
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </Table.Column>
                )}
              </Table.Header>
              <Table.Body items={data}>
                {(item: any) => (
                  <Table.Row key={item._id}>
                    {(columnKey: any) => {
                      return (
                        <Table.Cell
                          key={columnKey}
                          css={{
                            zIndex: 0,
                          }}
                        >
                          <RenderCell
                            user={item}
                            columnKey={columnKey}
                            handleStatusChange={handleStatusChange}
                            handleDelete={() =>
                              handleDelete({
                                _id: item._id,
                              })
                            }
                            setUser={setEditUser}
                            setId={setEditId}
                            showModal={showModal}
                            setShowModal={setShowModal}
                          />
                        </Table.Cell>
                      );
                    }}
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </>
        )}
      </>
      <CategoryModal
        show={showModal}
        onClose={() => setShowModal(false)}
        type="edit"
        user={editUser}
        id={editId}
        setCompletion={() => setCompletion(true)}
      />
    </Flex>
  );
};

export default Category;
