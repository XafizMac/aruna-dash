"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Admin } from "@/types/user";
import axios from "axios";
import { Loader2, PlusIcon, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Admins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [btnloading, setBtnLoading] = useState(false);
  const { toast } = useToast();
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("example@example.com");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      const response = await axios.get("/api/admins");
      setAdmins(response.data?.admins);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load admins",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAdmin = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/remove-admin/`, { id });
      setAdmins(response.data.admins);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove admin",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    setBtnLoading(true);
    try {
      const response = await axios.post(`/api/add-admin/`, { username, email });
      setAdmins(response.data.admins);
      toast({
        variant: "default",
        title: "Success",
        description: "Admin added successfully",
      });
      // window.location.reload();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add admin",
      });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="p-3 flex flex-col gap-4">
      {/* Dialog */}
      <Dialog>
        <DialogTrigger className="w-full self-end" asChild>
          <Button className="w-[max-content] max-sm:w-full" size={"sm"}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add admin
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create admin</DialogTitle>
            <DialogDescription>
              Create admins here. Click create when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                defaultValue={email}
                className="col-span-3"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue={username}
                className="col-span-3"
                onChange={(e) => setUsername(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={btnloading}
              onClick={() => handleAddAdmin()}
              type="submit"
            >
              {btnloading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {loading ? (
        <div>
          <Skeleton className="bg-gray-300 h-[100px] w-full" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Total admins: {admins.length}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              {/* Body */}
              <TableBody>
                {admins.map((admin, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{admin.id}</TableCell>
                      <TableCell>{admin.username}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => removeAdmin(admin.id)}
                          className="cursor-pointer"
                          variant={"ghost"}
                          asChild
                          size="icon"
                        >
                          <Trash2 className="text-red-600 w-6 h-6" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
