import React, { useState } from "react";
import { User, Text, Tooltip, Col, Row, StyledBadge } from "@nextui-org/react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { IconButton } from "../CategoryTable/table.styled";
import { EditIcon } from "../icons/table/edit-icon";
import CategoryModal from "../modal/categoryModal/CategoryModal";

interface RenderCellProps {
    user: any;
    columnKey: any;
    handleStatusChange: (_id: string, is_active: boolean) => Promise<void>;
    handleDelete: (id: string) => void;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setId: React.Dispatch<React.SetStateAction<string>>;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const RenderCell: React.FC<RenderCellProps> = ({
    user,
    columnKey,
    handleStatusChange,
    handleDelete,
    showModal,
    setShowModal,
    setId,
    setUser,
}) => {
    const cellValue = user[columnKey];
    const handleOpenModal = () => {
        setShowModal(true);
        setId(user._id);
        setUser(user);
        console.log(user._id);
        console.log("below is the user");
        console.log(user);
    };

    switch (columnKey) {
        case "name":
            return (
                <User
                    squared
                    src={user.photo[0]}
                    name={cellValue}
                    css={{ p: 0 }}
                >
                    {user.category}
                </User>
            );
        case "status":
            return (
                // @ts-ignore
                <StyledBadge color={user.is_active ? "success" : "error"}>
                    {user.is_active ? "Active" : "Inactive"}
                </StyledBadge>
            );

        case "actions":
            return (
                <>
                    <Row
                        justify="center"
                        align="center"
                        css={{
                            gap: "$8",
                            "@md": { gap: "24px" },
                            ml: "$2xl",
                        }}
                    >
                        <Tooltip content="Edit">
                            <IconButton
                                css={{ color: "Gray" }}
                                onClick={handleOpenModal}
                            >
                                <EditIcon size={20} fill="black" />
                            </IconButton>
                        </Tooltip>

                        {user.is_active ? (
                            <Tooltip content="Deactivate">
                                <IconButton
                                    css={{ color: "Red" }}
                                    onClick={() =>
                                        handleStatusChange(user._id, false)
                                    }
                                >
                                    Deactivate
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip content="Activate">
                                <IconButton
                                    css={{ color: "Green" }}
                                    onClick={() =>
                                        handleStatusChange(user._id, true)
                                    }
                                >
                                    Activate
                                </IconButton>
                            </Tooltip>
                        )}
                    </Row>
                </>
            );
        case "delete":
            return (
                <Row
                    justify="center"
                    align="center"
                    css={{ gap: "$8", "@md": { gap: 0 }, ml: "$2xl" }}
                >
                    <Col css={{ d: "flex", gap: "$12" }}>
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
