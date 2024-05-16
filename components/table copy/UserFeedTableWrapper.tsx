import { Table } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { Box } from "../styles/box";
import RenderCell from "./render-cell";
import {
  deleteBusiness,
  deleteThread,
  editBusiness,
  editThread,
  getFilteredBusinesses,
  searchBusinesses,
} from "../../pages/api/business";
import { Loader } from "./loader/Loader";
import { useSearchContext } from "../navbar/SearchContext";

import axios from "axios";

export const UserFeedTableWrapper = () => {
  const [businesses, setBusinesses] = useState<any>([]);
  const [status, setStatus] = useState<string>("PENDING");
  const [totalpage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const columns = [
    { name: "View image", uid: "message_body" },
    { name: "STATUS", uid: "is_approved" },
    { name: "Update", uid: "role" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const getBusiness = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://stingray-app-zclxo.ondigitalocean.app/api/v1/thread/getThread?page=${page}`
      );
      console.log(response.data.result); // Logging the response data
      setLoading(false);
      setBusinesses(response.data.result);
    } catch (error) {
      console.error("Error fetching business data:", error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setLoading(true);
      const updatedBusiness = await editThread(id, newStatus);
      getBusiness();
      setBusinesses((prevBusinesses: any) =>
        prevBusinesses.map((business: any) =>
          business._id === id
            ? { ...business, status: updatedBusiness.status }
            : business
        )
      );
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false); // Hide loader regardless of success or error
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this business?"
    );
    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      await deleteThread(id);
      getBusiness();
      setBusinesses((prevBusinesses: any) =>
        prevBusinesses.filter((business: any) => business._id !== id)
      );
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false); // Hide loader regardless of success or error
    }
  };

  useEffect(() => {
    getBusiness();
  }, [page]);

  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 30,
        }}
      >
        {/* <div className="radio-inputs">
          <label className="radio">
            <input
              type="radio"
              name="radio"
              onClick={() => setStatus("PENDING")}
            />
            <span className="name">Pending</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              onClick={() => setStatus("ACTIVE")}
              checked={status === "ACTIVE"}
            />
            <span className="name">Active</span>
          </label>
        </div> */}
        <div className="" style={{ display: "flex", gap: "10px" }}>
          <button className="Btn" onClick={() => setPage(page - 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
          </button>
          <button className="Btn" style={{ color: "white" }}>
            {page}
          </button>

          <button className="Btn" onClick={() => setPage(page + 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </button>
        </div>
      </div>
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
            selectionMode="multiple"
          >
            <Table.Header columns={columns}>
              {(column: any) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={businesses}>
              {(item: any) => (
                <Table.Row key={item._id}>
                  {(columnKey: any) => (
                    <Table.Cell key={columnKey}>
                      <RenderCell
                        user={item}
                        columnKey={columnKey}
                        handleStatusChange={handleStatusChange}
                        handleDelete={handleDelete}
                      />
                    </Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </>
      )}
    </Box>
  );
};
