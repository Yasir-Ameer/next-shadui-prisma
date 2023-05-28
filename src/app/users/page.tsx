import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/../components/ui/table";
import { prisma } from "@/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { Edit, Trash } from "lucide-react";

function getUsers() {
  return prisma.user.findMany();
}

export const metadata = {
  title: "Users List"
}


export default async function UsersTabl() {
  const users = await getUsers();

  return (
    <div className="p-8 h-[100vh]">
      <Button className="mb-2" asChild>
        <Link href="/users/new">New</Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>List of users that joined the developers club.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id.substring(0, 5)}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.language}</TableCell>
                  <TableCell>
                    <Button variant="ghost" asChild>
                        <Link href={`/users/${user.id}`}>
                            <Trash className="h-4 w-4" />                                                                                                                                                                                                                                               
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href={`/users/edit/${user.id}`}>
                            <Edit className="h-4 w-4" />                                                                                                                                                                                                                                               
                        </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );                                                                                                                                                                         
}
