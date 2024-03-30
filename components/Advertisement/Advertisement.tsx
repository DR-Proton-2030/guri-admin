import React, { useEffect, useState } from "react";
import { Flex } from "../styles/flex";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Button, Input, Text } from "@nextui-org/react";

import Link from "next/link";
import AddAdvertisement from "./addAdvertisement/AddAdvertisement";
import Image from "next/image";

const Advertisement = () => {
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
                    <CrumbLink href="#">Advertisement</CrumbLink>
                    <Text>/</Text>
                </Crumb>
                <Crumb>
                    <CrumbLink href="#">List</CrumbLink>
                </Crumb>
            </Breadcrumbs>

            <Text h3>Advertisement</Text>

            <AddAdvertisement />
        </Flex>
    );
};

export default Advertisement;
