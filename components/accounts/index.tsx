import { Button, Input, Text } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Flex } from "../styles/flex";
import { TableWrapper } from "../table/table";

export const Accounts = () => {
  const [businesses, setBusinesses] = useState([]);

  const getBusiness = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8989/api/v1/business/getBusiness"
      );
      console.log(response.data.result.businesses); // Logging the response data
      setBusinesses(response.data.result.businesses);
    } catch (error) {
      console.error("Error fetching business data:", error);
    }
  };

  useEffect(() => {
    getBusiness();
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
          <CrumbLink href="#">Business</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>All Posts</Text>

      <TableWrapper />
    </Flex>
  );
};
