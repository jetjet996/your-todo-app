import { useState } from "react";

export function useFilter() {
    const [searchInput, setSearchInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedUser, setSelectedUser] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState(-1);

    const reset = () => {
        setSearchInput("");
        setSelectedCategory(0);
        setSelectedUser(0);
        setSelectedStatus(-1);
    };

    return {
        searchInput,
        selectedCategory,
        selectedUser,
        selectedStatus,
        setSearchInput,
        setSelectedCategory,
        setSelectedUser,
        setSelectedStatus,
        reset,
    };
}