"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SimpleLoginTest() {
  const [result, setResult] = useState("");

  const testLogin = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "parent@school.com",
      password: "parent123"
    });
    
    if (error) {
      setResult("Error: " + error.message);
    } else {
      setResult("Success! User: " + data.user?.email);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Login Test</h1>
      <button onClick={testLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
        Test Login
      </button>
      {result && <pre className="mt-4 p-2 bg-gray-100 rounded">{result}</pre>}
    </div>
  );
}
