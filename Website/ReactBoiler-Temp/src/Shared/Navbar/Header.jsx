"use client"

import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../../Providers/AuthProvider"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link as NextUILink,
  Avatar,
} from "@nextui-org/react"

const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default function Header() {
  const { user, signOutUser } = useContext(AuthContext)
  const location = useLocation()

  const handleLogOut = () => {
    signOutUser().then().catch()
  }

  return (
    <Navbar className=" bg-[#155c45]">
      <NavbarBrand>
        <Link to="/" className="flex items-center gap-3">
          <p className="font-bold text-inherit text-3xl text-white">RetireFlow</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={location.pathname === "/features"}>
          <NextUILink
            as={Link}
            color={location.pathname === "/features" ? "primary" : "foreground"}
            to="/features"
            className="text-[#fff] text-1xl font-bold hover:text-purple-400 transition-colors duration-300 ease-in-out"
          >
            Features
          </NextUILink>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/faq"}>
          <NextUILink
            as={Link}
            color={location.pathname === "/faq" ? "primary" : "foreground"}
            to="/faq"
            className="text-[#fff] text-1xl font-bold hover:text-purple-400 transition-colors duration-300 ease-in-out"
            aria-current={location.pathname === "/faq" ? "page" : undefined}
          >
            FAQ
          </NextUILink>
        </NavbarItem>
        {user && (
  <NavbarItem isActive={location.pathname === "/integrations"}>
    <NextUILink
      as={Link}
      color={location.pathname === "/agent" ? "primary" : "foreground"}
      to="/agent"
      className="text-[#fff] text-1xl font-bold hover:text-purple-400 transition-colors duration-300 ease-in-out"
    >
      Agent
    </NextUILink>
  </NavbarItem>
)}
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button className="flex items-center gap-2 rounded-full transition-colors">
                <span className="hidden text-sm font-medium md:block text-white">
                  {user.displayName?.split(" ")[0] || "User"}
                </span>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu" variant="flat" className="mt-3 ml-14">
              <DropdownItem key="profile" textValue="Profile">
                <Link to="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem key="settings" textValue="Settings">
                <Link to="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                onPress={handleLogOut}

              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <NextUILink
                as={Link}
                to="/login"
                className="text-[#fff] text-1xl font-bold hover:text-blue-400 transition-colors duration-300 ease-in-out"
              >
                Login
              </NextUILink>
            </NavbarItem>
            <NavbarItem>
              <NextUILink
                as={Link}
                to="/register"
                color="primary"
                variant="flat"
                size="sm"
                className="text-[#fff] text-1xl font-bold hover:text-blue-400 transition-colors duration-300 ease-in-out"
              >
                Sign Up
              </NextUILink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
