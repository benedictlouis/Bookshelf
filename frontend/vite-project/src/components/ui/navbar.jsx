import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
} from "@/components/ui/menubar";

const Navbar = () => {
    const navigate = useNavigate();

    const handleAddBook = () => {
        navigate('/add_book');
    };

    const handleViewProfile = () => {
        navigate('/profile');
    };

    return (
        <div className="bg-gray-800 p-2 w-full fixed top-0 left-0 z-50 flex items-center justify-between bg-opacity-90">
            <div className="text-lg font-bold text-white ml-4">Bookshelf</div>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger className="text-black">Home</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onSelect={handleAddBook}>Add Book</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger className="text-black">Profile</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onSelect={handleViewProfile}>View Profile</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onSelect={() => alert('Logout')}>Logout</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
};

export default Navbar;
