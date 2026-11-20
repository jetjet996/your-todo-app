import { useState } from "react";

export function useFilter() {
    const [searchInput, setSearchInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedUser, setSelectedUser] = useState(0);
    const [completed, setCompleted] = useState(0);

    const nextPage = () => {
        console.log("adada");
    };


    return {
        searchInput,
        selectedCategory,
        selectedUser,
        completed,
        setSearchInput,
        setSelectedCategory,
        setSelectedUser,
        setCompleted,
    };
}