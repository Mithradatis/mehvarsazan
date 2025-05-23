"use client";

import { useState } from "react";
import LanguagesEnum from "constants/Languages";
import Link from "next/link";
import { usePathname } from "next/navigation";

const renderSubMenu = (item: any, openSubMenuIds: Set<string>, toggleSubMenu: (id: string) => void) => {
    const isSubMenuOpen = openSubMenuIds.has(item.id);

    return (
        <div key={item.id} className="relative">
            <Link
                href={item.uri || "#"}
                target={item.target || "_self"}
                className="block py-2 text-white relative"
            >
                <span>
                    {item.label}
                </span>
                {item.children && item.children.length > 0 && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleSubMenu(item.id);
                        }}
                        className="text-white absolute w-full h-full end-0 top-0 flex items-center justify-end"
                    >
                        <span>
                            {isSubMenuOpen ? "▲" : "▼"}
                        </span>
                    </button>
                )}
            </Link>
            {item.children && item.children.length > 0 && isSubMenuOpen && (
                <div className="ps-4">
                    {item.children.map((child: any) => renderSubMenu(child, openSubMenuIds, toggleSubMenu))}
                </div>
            )}
        </div>
    );
};

const findActiveMenuItem = (items: any[], pathname: string): any => {
    for (const item of items) {
        if (item.uri === pathname) {
            return item;
        }
        if (item.children && item.children.length > 0) {
            const found = findActiveMenuItem(item.children, pathname);
            if (found) return found;
        }
    }
    return null;
};

const ClientSideMenu = ({ menuItems }: { menuItems: any }) => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenuIds, setOpenSubMenuIds] = useState<Set<string>>(new Set());

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSubMenu = (id: string) => {
        setOpenSubMenuIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };
    
    let activeMenuItem: any;
    const languageValues = Object.values(LanguagesEnum) as string[];
    const pathSegments = pathname.split("/").filter(Boolean);
    const isLanguageRoot = pathSegments.length === 1 && languageValues.includes(pathSegments[0]);

    if (isLanguageRoot) {
        activeMenuItem = menuItems[0];
    } else {
        activeMenuItem = findActiveMenuItem(menuItems, pathname) || { label: "" };
    }

    return (
        <div className="lg:hidden flex items-center py-4 min-h-[56px]">
            <button
                id="hamburger"
                className="text-white"
                onClick={toggleMenu}
            >
                <span className={`block h-1 bg-white mb-1 ${isMenuOpen ? "rotate-45 w-4" : "w-6"}`}></span>
                <span className={`block h-1 bg-white mb-1 ${isMenuOpen ? "hidden" : "w-6"}`}></span>
                <span className={`block h-1 bg-white mb-1 ${isMenuOpen ? "-rotate-45 w-4" : "w-6"}`}></span>
            </button>
            <span
                className="
                ms-3 
                text-white
                text-demi-bold 
                text-xl"
            >
                {
                    activeMenuItem.label
                }
            </span>
            {isMenuOpen && (
                <div className="absolute top-full start-[2%] bg-[rgba(34,34,34,.9)] backdrop-blur-md p-4 rounded-b-md w-[96%]">
                    {menuItems?.map((item: any) => renderSubMenu(item, openSubMenuIds, toggleSubMenu))}
                </div>
            )}
        </div>
    );
};

export default ClientSideMenu;
