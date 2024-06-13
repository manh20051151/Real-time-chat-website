import icons from "./icons";
import path from "./path";
import { IoChatboxEllipses } from "react-icons/io5";
import { RiContactsBook2Fill, RiContactsLine } from "react-icons/ri";
import { MdPersonAddAlt } from "react-icons/md";
const { AiOutlineDashboard, MdGroups } = icons;
export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiOutlineDashboard size={20} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Manage users",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <MdGroups size={20} />,
  },
];
export const phoneBookSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Danh sách bạn bè",
    path: `/${path.HOME}/${path.PHONEBOOK}/${path.LISTFRIEND}`,
    icon: <RiContactsLine size={20} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Lời mời kết bạn",
    path: `/${path.HOME}/${path.PHONEBOOK}/${path.ADDFRIEND}`,
    icon: <MdPersonAddAlt size={20} />,
  },
];

export const memberSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Personal",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <AiOutlineDashboard size={20} />,
  },
];
export const homeSidebar = [
  {
    id: 1,
    type: "SINGLE",
    path: `/${path.HOME}/${path.HOMELAYOUT}`,
    icon: <IoChatboxEllipses className="text-[30px] text-white" />,
  },
  {
    id: 2,
    type: "SINGLE",
    path: `/${path.HOME}/${path.PHONEBOOK}`,
    icon: <RiContactsBook2Fill className="text-[30px] text-white" />,
  },
];

export const roles = [
  {
    code: 1,
    value: "Admin",
  },
  {
    code: 0,
    value: "User",
  },
];

export const blockStatus = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];
