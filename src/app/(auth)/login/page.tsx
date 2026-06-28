"use client";

import { useState } from "react";
import { Logo } from "@/components/shared/logo";
import { FadeIn } from "@/components/shared/animated-container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <FadeIn>
      <div className="glass rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            Welcome back
          </h1>
          <p className="text-sm text-text-secondary">
            Sign in to continue your legal research
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-text-secondary">Email</Label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <Input
                type="email"
                placeholder="you@example.com"
                defaultValue="demo@nyayneti.com"
                className="pl-10 bg-white/5 border-glass-border text-text-primary placeholder:text-text-muted focus:border-gold/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-text-secondary">Password</Label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <Input
                type="password"
                placeholder="••••••••"
                defaultValue="password"
                className="pl-10 bg-white/5 border-glass-border text-text-primary placeholder:text-text-muted focus:border-gold/50"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold hover:opacity-90 h-11"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="relative">
          <Separator className="bg-glass-border" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0d1f4e] px-3 text-xs text-text-muted">
            Or continue with
          </span>
        </div>

        <Button
          variant="outline"
          className="w-full border-glass-border text-text-secondary hover:text-text-primary hover:bg-white/5 h-11"
          onClick={() => router.push("/dashboard")}
        >
          <Globe size={18} className="mr-2" />
          Google
        </Button>

        <p className="text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-gold hover:text-gold-light font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </FadeIn>
  );
}
