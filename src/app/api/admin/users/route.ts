import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { email, password, full_name, role } = await request.json();

    console.log("Creating user:", { email, full_name, role });

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("email", email);

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ 
        error: "User already exists", 
        exists: true 
      }, { status: 400 });
    }

    // Create user
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name, role }
    });

    if (userError) {
      console.error("Create user error:", userError);
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    if (userData?.user) {
      // Insert profile (using upsert to handle duplicates)
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .upsert({
          id: userData.user.id,
          email,
          full_name: full_name || email.split("@")[0],
          role: role || "student",
        }, { onConflict: "id" });

      if (profileError) {
        console.error("Profile error:", profileError);
        return NextResponse.json({ error: profileError.message }, { status: 400 });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "User created successfully",
      user: { email, full_name, role }
    });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
