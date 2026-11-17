"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function SignIn() {
  const signIn = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback?next=/start",
      },
    });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-6 py-12">
      <div className="space-y-3">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Gems Future</span>
        <h1 className="text-[1.65rem] font-semibold tracking-tight text-ink sm:text-[2rem]">{"Let's find your direction"}</h1>
        <p className="leading-relaxed text-muted-foreground">Sign in to begin. It takes about two minutes, and your answers stay private to you.</p>
      </div>
      <div className="mt-10">
        <Button onClick={signIn} className="w-full" size="lg">Continue with Google</Button>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">By continuing you agree to be contacted about your result.</p>
    </main>
  );
}
