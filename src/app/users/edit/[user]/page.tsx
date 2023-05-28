import * as React from "react";

import { Button } from "@/../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/../components/ui/card";
import { Input } from "@/../components/ui/input";
import { Label } from "@/../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/../components/ui/select";
import { DatePicker } from "@/components/DateTimePicker";
import { Checkbox } from "@/../components/ui/checkbox";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Edit User"
}

export default async function CardWithForm({params} : {params:{user:string}}) {
    async function updateUser(data: FormData) {
        "use server";
      
        const name = data.get("name")?.valueOf()
        const username = data.get("username")?.valueOf()
        const email = data.get("email")?.valueOf()
        const password = data.get("password")?.valueOf()
        const language = data.get("language")?.valueOf()
        
        if(
          typeof name !== "string" ||
          typeof username !== "string" ||
          typeof email !== "string" ||
          typeof password !== "string" ||
          typeof language !== "string"
          ){
            return
        }
      
        try {
          await prisma.user.update({
            where:{
                id: params.user
            },
            data: {
              name,
              username,
              email,
              password,
              language,
              dob: new Date(),       
            }
          })
        } catch (error) {
          console.log(error);
          
        }
        redirect('/users')
      }

const user = await prisma.user.findFirst({where:{id: params.user}})
      
  return (
    <form action={updateUser}>
      <div className="flex justify-center items-center p-8">
        <Card className="w-[40%]">
          <CardHeader>
            <CardTitle>Developer Club</CardTitle>
            <CardDescription>Sign up following these steps.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={user?.name} placeholder="Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" defaultValue={user?.username} placeholder="Username" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user?.email}
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  defaultValue={user?.password}
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Date of Birth</Label>
                <DatePicker />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Programming Language</Label>
                <Select name="language" defaultValue={user?.language}>
                  <SelectTrigger>
                    <SelectValue  placeholder="astro"/>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" name="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" asChild>
                <Link href="/users">Cancel</Link>
            </Button>
            <Button type="submit">Signup</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
