import React from "react";
import { User, Text, Tooltip, Col, Row, StyledBadge } from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { IconButton } from "./table.styled";
import { EditIcon } from "../icons/table/edit-icon";
import EditBusinessDetails from "../accounts/add-user";

interface RenderCellProps {
  user: any;
  columnKey: any;
  handleStatusChange: (id: string, newStatus: string) => void;
  handleDelete: (id: string) => void;
}

const RenderCell: React.FC<RenderCellProps> = ({
  user,
  columnKey,
  handleStatusChange,
  handleDelete,
}) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "message_body":
      return (
        <User
          squared
          src={user?.message_media_url}
          name={cellValue}
          css={{ p: 0 }}
        >
          {user.user_details?.email}
        </User>
      );
    case "role":
      return (
        <Col css={{ d: "flex", ml: 10 }}>
          {user?.status === "PENDING" ? (
            <>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Activate">
                  <IconButton
                    css={{ color: "Green" }}
                    onClick={() => handleStatusChange(user._id, "ACTIVE")}
                  >
                    Active
                  </IconButton>
                </Tooltip>
              </Col>
              <Col css={{ d: "flex" }}>
                <Tooltip content="Reject">
                  <IconButton
                    css={{ color: "Red" }}
                    onClick={() => handleStatusChange(user._id, "REJECTED")}
                  >
                    Reject
                  </IconButton>
                </Tooltip>
              </Col>
            </>
          ) : null}
        </Col>
      );
    case "is_approved":
      return (
        // @ts-ignore
        <StyledBadge type={String(user.is_approved)}>
          {user?.status === "ACTIVE" ? "Active" : "Pending"}
        </StyledBadge>
      );
    case "createdAt":
      // Format createdAt field to display date, month, and year
      const formattedDate = new Date(cellValue).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDate;
    case "actions":
      return (
        <Row
          justify="center"
          align="center"
          css={{ gap: "$8", "@md": { gap: 0 }, ml: "$2xl" }}
        >
          <Col css={{ d: "flex", gap: "$12" }}>
            {/* <EditBusinessDetails business_Details={user} /> */}
            <Tooltip
              content="Delete"
              color="error"
              onClick={() => handleDelete(user._id)}
            >
              <IconButton>
                <DeleteIcon size={20} fill="#FF0080" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      );
    default:
      return cellValue;
  }
};

export default RenderCell;
