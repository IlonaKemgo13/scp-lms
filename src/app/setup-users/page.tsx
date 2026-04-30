"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SetupUsersPage() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const createAllUsers = async () => {
    setLoading(true);
    setStatus("Creating users...");
    
    const supabase = createClient();
    
    const users = [
      { email: "admin@school.com", password: "admin123", role: "admin", name: "Admin User" },
      { email: "teacher@school.com", password: "teacher123", role: "teacher", name: "Teacher User" },
      { email: "student@school.com", password: "student123", role: "student", name: "Student User" },
      { email: "parent@school.com", password: "parent123", role: "parent", name: "Parent User" },
    ];
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const user of users) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: user.email,
          password: user.password,
          options: {
            data: {
              full_name: user.name,
              role: user.role
            }
          }
        });
        
        if (error) {
          if (error.message.includes("already registered")) {
            setStatus(prev => prev + `\n${user.email}: already exists`);
            successCount++;
          } else {
            setStatus(prev => prev + `\n${user.email}: ${error.message}`);
            errorCount++;
          }
        } else {
          setStatus(prev => prev + `\n${user.email}: created successfully!`);
          successCount++;
        }
      } catch (err: any) {
        setStatus(prev => prev + `\n${user.email}: error - ${err.message}`);
        errorCount++;
      }
    }
    
    setStatus(prev => prev + `\n\nDone! Created: ${successCount}, Errors: ${errorCount}`);
    setLoading(false);
  };

  const updateProfiles = async () => {
    setLoading(true);
    setStatus("Updating profiles...");
    
    const supabase = createClient();
    
    // Get all auth users
    const { data: users } = await supabase.auth.admin.listUsers();
    
    for (const user of users?.users || []) {
      let role = "student";
      let fullName = user.email?.split("@")[0];
      
      if (user.email?.includes("admin")) { role = "admin"; fullName = "Admin User"; }
      else if (user.email?.includes("teacher")) { role = "teacher"; fullName = "Teacher User"; }
      else if (user.email?.includes("parent")) { role = "parent"; fullName = "Parent User"; }
      else if (user.email?.includes("student")) { role = "student"; fullName = "Student User"; }
      
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          email: user.email,
          full_name: fullName,
          role: role,
        });
      
      if (error) {
        setStatus(prev => prev + `\nError for ${user.email}: ${error.message}`);
      } else {
        setStatus(prev => prev + `\nUpdated: ${user.email} -> ${role}`);
      }
    }
    
    setStatus(prev => prev + "\n\nProfiles updated!");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">User Setup</h1>
        <p className="text-gray-500 mb-6">Create all demo users (Admin, Teacher, Student, Parent)</p>
        
        <div className="space-y-4">
          <button
            onClick={createAllUsers}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Working..." : "Step 1: Create All Users"}
          </button>
          
          <button
            onClick={updateProfiles}
            disabled={loading}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Working..." : "Step 2: Update Profiles"}
          </button>
        </div>
        
        {status && (
          <pre className="mt-6 p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-auto max-h-96">
            {status}
          </pre>
        )}
      </div>
    </div>
  );
}
