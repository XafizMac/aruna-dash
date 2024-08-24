"use client";

import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/user";
import axios from "axios";
import { EllipsisVertical, PlusIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data.data);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load users",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStatusChange = async (user: User) => {
    setLoading(true);
    try {
      await axios.post("/api/user-status", {
        id: user.id,
        status: user.status,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user status",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      {/* Dialog */}
      <Dialog open>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="max-sm:text-center">Change user&apos;s data</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                // defaultValue={email}
                className="col-span-3"
                type="email"
                // onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                // defaultValue={username}
                className="col-span-3"
                // onChange={(e) => setUsername(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              // disabled={btnloading}
              // onClick={() => handleAddAdmin()}
              type="submit"
            >
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
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Total users: {users.length}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              {/* Body */}
              <TableBody>
                {users.map((user, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "ACTIVE" ? "default" : "destructive"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="outline">
                          <EllipsisVertical size={20} strokeWidth={1.25} />
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
