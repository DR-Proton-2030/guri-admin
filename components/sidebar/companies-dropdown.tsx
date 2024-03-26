import { Dropdown, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon";
import logo from "../assets/WhatsApp Image 2024-03-21 at 08.43.39.jpeg";
import { AcmeLogo } from "../icons/acmelogo";
import { BottomIcon } from "../icons/sidebar/bottom-icon";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
// import Image from 'next/image';

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
  icon: Object;
}

export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    name: "Ghuri Gharangna.",
    location: "Punjab,India",
    logo: "",
    icon: <img src={logo.toString()} alt="Logo" />,
  });
  return (
    <Box className="">
      <Flex align={"center"} css={{ gap: "$7" }}>
        {company.logo}
        <Box>
          <Text
            h3
            size={"$xl"}
            weight={"medium"}
            css={{
              m: 0,
              color: "$accents9",
              lineHeight: "$lg",
              mb: "-$5",
            }}
          >
            {company.name}
          </Text>
          <Text
            span
            weight={"medium"}
            size={"$xs"}
            css={{ color: "$accents8" }}
          >
            {company.location}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
