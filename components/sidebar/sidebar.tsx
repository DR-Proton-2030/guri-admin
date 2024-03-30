import React, { useState } from "react";
import { Box } from "../styles/box";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { SidebarItem } from "./sidebarItem/sidebar-item";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { useRouter } from "next/router";

export const SidebarWrapper = () => {
    const router = useRouter();
    const { collapsed, setCollapsed } = useSidebarContext();

    return (
        <Box
            as="aside"
            css={{
                height: "100vh",
                zIndex: 202,
                position: "sticky",
                top: "0",
            }}
        >
            {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

            <Sidebar collapsed={collapsed}>
                <Sidebar.Header>
                    <CompaniesDropdown />
                </Sidebar.Header>
                <Flex
                    direction={"column"}
                    justify={"between"}
                    css={{ height: "100%" }}
                >
                    <Sidebar.Body className="body sidebar">
                        <SidebarItem
                            title="Home"
                            icon={<HomeIcon />}
                            isActive={router.pathname === "/"}
                            href="/"
                        />
                        <SidebarItem
                            title="Category"
                            icon={<HomeIcon />}
                            isActive={router.pathname === "/CategoryPage"}
                            href="/Category"
                        />
                        <SidebarItem
                            title="Advertisement"
                            icon={<HomeIcon />}
                            isActive={router.pathname === "/AdvertisementPage"}
                            href="/Advertisement"
                        />
                    </Sidebar.Body>
                    <Sidebar.Footer>
                        <Tooltip content={"Settings"} rounded color="primary">
                            <SettingsIcon />
                        </Tooltip>
                        <Tooltip
                            content={"Adjustments"}
                            rounded
                            color="primary"
                        >
                            <FilterIcon />
                        </Tooltip>
                        <Tooltip content={"Profile"} rounded color="primary">
                            <Avatar
                                src="https://imgs.search.brave.com/bFF8_xQy_-cBA55VIKAy68h8rgyZDOyvB5FXxL1xR5g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY1LzEwLzQ3/LzM2MF9GXzY1MTA0/NzE4X3gxN2E3Nnd6/V0tJbTNCbGhBNnV5/WVZrRHM5OTgyYzZx/LmpwZw"
                                size={"sm"}
                            />
                        </Tooltip>
                    </Sidebar.Footer>
                </Flex>
            </Sidebar>
        </Box>
    );
};
