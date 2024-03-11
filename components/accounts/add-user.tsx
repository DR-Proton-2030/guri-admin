import {
  Button,
  Divider,
  Input,
  Modal,
  Text,
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Flex } from "../styles/flex";
import { IconButton } from "../table/table.styled";
import axios from "axios"; // Import axios for making API requests
import { EditIcon } from "../icons/table/edit-icon";
import { editBusinessDetails } from "../../pages/api/business";

const EditBusinessDetails = ({ business_Details }: any) => {
  const [visible, setVisible] = useState(false);
  const [editedFields, setEditedFields] = useState<any>({}); // State to store edited fields
  const [loading, setLoading] = useState(false);
  console.log("----->", business_Details);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditedFields((prevFields: any) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await editBusinessDetails(
        business_Details._id,
        editedFields
      );
      if (response) {
        console.log("Details updated successfully");
        closeHandler();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating business details:", error);
    }
  };

  return (
    <div>
      <Tooltip content="Edit" color="invert" onClick={handler}>
        <IconButton>
          <EditIcon size={20} fill="black" />
        </IconButton>
      </Tooltip>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header css={{ justifyContent: "start" }}>
          <Text id="modal-title" h4>
            Edit Business Details
          </Text>
        </Modal.Header>
        <Divider css={{ my: "$5" }} />
        <Modal.Body css={{ py: "$10" }}>
          <Flex
            direction={"row"}
            css={{
              flexWrap: "wrap",
              gap: "$8",
            }}
          >
            <Flex css={{ gap: "$15" }}>
              <Input
                label="Business Name"
                name="name"
                value={editedFields.name ?? business_Details.name} // Use edited value if available, otherwise use original value
                onChange={handleChange}
                bordered
                clearable
                size="lg"
                placeholder="Business Name"
              />
              <Input
                label="Email"
                name="email"
                value={editedFields.email ?? business_Details.email}
                onChange={handleChange}
                clearable
                bordered
                size="lg"
                placeholder="Email"
              />
            </Flex>
            <Flex css={{ gap: "$15" }}>
              <Input
                label="Phone Number"
                name="phone_no"
                value={editedFields.phone_no ?? business_Details.phone_no}
                onChange={handleChange}
                bordered
                clearable
                size="lg"
                placeholder="Phone Number"
              />
              <Input
                label="Location"
                name="location"
                value={editedFields.location ?? business_Details.location}
                onChange={handleChange}
                clearable
                bordered
                size="lg"
                placeholder="Location"
              />
            </Flex>{" "}
            <Flex css={{ gap: "$15" }}>
              <Input
                label="Business Category"
                name="category"
                value={editedFields.category ?? business_Details.category}
                onChange={handleChange}
                bordered
                clearable
                size="lg"
                placeholder="Business Name"
              />
              <Input
                label="Description"
                name="description"
                value={editedFields.description ?? business_Details.description}
                onChange={handleChange}
                clearable
                bordered
                size="lg"
                placeholder="Description"
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer css={{ mx: "auto" }}>
          <Button
            auto
            css={{ py: "$10", px: "$18" }}
            onClick={handleSave}
            disabled={loading}
          >
            Save Details
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditBusinessDetails;
