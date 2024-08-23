"use client";

import { PanelLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navbar, { Menu } from "../navbar/Navbar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex gap-4 justify-end p-3">
      <Sheet>
        <SheetTrigger className="hidden max-sm:block">
          <Button
            className="hidden max-sm:block cursor-pointer p-2"
            asChild
            variant="outline"
            size={"icon"}
          >
            <PanelLeft strokeWidth={1.25} />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="flex items-start gap-3">
            <Image width={40} src={require("../../../public/vercel.png")} alt="" />
            {Menu.map((item, index) => (
              <Button
                onClick={() => handleClick(item.path)}
                variant="ghost"
                className="text-gray-600 text-xl"
              >
                {item.icon}
                <span>{item.title}</span>
              </Button>
            ))}
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Input
        className="w-[300px] max-sm:w-full"
        type="text"
        placeholder="Search"
      />
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
        <AvatarFallback>ADMIN</AvatarFallback>
      </Avatar>
    </div>
  );
};
