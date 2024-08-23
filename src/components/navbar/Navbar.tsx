"use client";

import {
  Book,
  Braces,
  ChartBarStacked,
  Globe,
  UserPen,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";
import { usePathname, useRouter } from "next/navigation";

interface MenuProps {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export const Menu: MenuProps[] = [
  {
    title: "Users",
    path: "/users",
    icon: <Users size={20} />,
  },
  {
    title: "Admins",
    path: "/admins",
    icon: <UserPen size={20} />,
  },
  {
    title: "Category",
    path: "/category",
    icon: <ChartBarStacked size={20} />,
  },
  {
    title: "Books",
    path: "/books",
    icon: <Book size={20} />,
  },
  {
    title: "English",
    path: "/english",
    icon: <Globe size={20} />,
  },
  {
    title: "IT",
    path: "/it",
    icon: <Braces size={20} />,
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="bg-white p-3 flex flex-col items-center gap-2 border-r-[1px] border-gray-200 max-sm:absolute max-sm:left-[-100%]">
      <Image
        width={35}
        height={35}
        src={require("../../../public/vercel.png")}
        alt="Logo"
        className="mb-3"
      />
      {Menu.map((item, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleClick(item.path)}
                size="icon"
                variant={item.path == pathname ? "secondary" : "ghost"}
                className="text-gray-400"
              >
                {item.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
