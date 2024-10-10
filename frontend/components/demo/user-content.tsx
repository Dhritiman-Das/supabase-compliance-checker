import React from "react";
import { Navbar } from "@/components/admin-panel/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getUserDetails } from "@/lib/fetchers";

export default async function UserContent() {
  const [user] = await Promise.all([getUserDetails()]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar title={"User Profile"} />
      <div className="flex justify-center items-center mt-6 px-4">
        <div className="container flex flex-col gap-4">
          {/* Basic User Details Card */}
          <Card className="bg-card text-card-foreground border border-border">
            <CardHeader>
              <CardTitle className="text-primary">Basic Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                {user.image && (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                )}
                <div>
                  <p className="text-lg font-medium">{user.name}</p>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supabase Details Card */}
          {user.isSupabaseSetup && (
            <Card className="bg-card text-card-foreground border border-border">
              <CardHeader>
                <CardTitle className="text-primary">Supabase Details</CardTitle>
                <CardDescription className="text-secondary-foreground">
                  These are your Supabase details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row">
                    <strong className="w-[200px] sm:w-48 text-muted-foreground mb-1 sm:mb-0">
                      Supabase URL:
                    </strong>
                    <span className="text-foreground break-all max-w-[60%]">
                      {user.supabaseUrl}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <strong className="w-[200px] sm:w-48 text-muted-foreground mb-1 sm:mb-0">
                      Anon Key:
                    </strong>
                    <span className="text-foreground break-all max-w-[60%]">
                      {user.supabaseAnonKey}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <strong className="w-[200px] sm:w-48 text-muted-foreground mb-1 sm:mb-0">
                      API Key:
                    </strong>
                    <span className="text-foreground break-all max-w-[60%]">
                      {user.supabaseApiKey}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
