"use client";

import { FadeIn, GlassCard } from "@/components/shared/animated-container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { User, Crown, Bell, Key, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <FadeIn>
        <h1 className="text-3xl font-heading font-bold text-text-primary">
          Settings
        </h1>
        <p className="text-text-secondary mt-1">
          Manage your account and preferences
        </p>
      </FadeIn>

      {/* Profile */}
      <FadeIn delay={0.1}>
        <GlassCard hover={false} className="space-y-6">
          <div className="flex items-center gap-3">
            <User size={20} className="text-gold" />
            <h2 className="text-lg font-semibold text-text-primary">Profile</h2>
          </div>
          <Separator className="bg-glass-border" />
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-glass-border">
              <AvatarFallback className="bg-navy text-gold text-lg font-bold">
                DU
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              className="border-glass-border text-text-secondary hover:text-text-primary hover:bg-white/5"
            >
              Change Avatar
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-text-secondary">Full Name</Label>
              <Input
                defaultValue="Demo User"
                className="bg-white/5 border-glass-border text-text-primary focus:border-gold/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-text-secondary">Email</Label>
              <Input
                defaultValue="demo@nyayneti.com"
                readOnly
                className="bg-white/5 border-glass-border text-text-muted cursor-not-allowed"
              />
            </div>
          </div>
          <Button
            onClick={() => toast.success("Profile saved")}
            className="bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold hover:opacity-90"
          >
            Save Changes
          </Button>
        </GlassCard>
      </FadeIn>

      {/* Subscription */}
      <FadeIn delay={0.15}>
        <GlassCard hover={false} className="space-y-6">
          <div className="flex items-center gap-3">
            <Crown size={20} className="text-gold" />
            <h2 className="text-lg font-semibold text-text-primary">
              Subscription
            </h2>
          </div>
          <Separator className="bg-glass-border" />
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-text-primary">Current Plan</p>
                <Badge className="bg-white/10 text-text-secondary border-glass-border">
                  Free
                </Badge>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                10 analyses per month • Basic features
              </p>
            </div>
            <Button className="bg-gradient-to-r from-gold to-gold-dark text-navy-deep font-semibold hover:opacity-90">
              Upgrade to Pro
            </Button>
          </div>
        </GlassCard>
      </FadeIn>

      {/* Preferences */}
      <FadeIn delay={0.2}>
        <GlassCard hover={false} className="space-y-6">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-gold" />
            <h2 className="text-lg font-semibold text-text-primary">
              Preferences
            </h2>
          </div>
          <Separator className="bg-glass-border" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">
                  Email Notifications
                </p>
                <p className="text-sm text-text-secondary">
                  Receive analysis completion alerts
                </p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-glass-border" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Auto-save</p>
                <p className="text-sm text-text-secondary">
                  Automatically save analysis results
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </GlassCard>
      </FadeIn>

      {/* API Keys */}
      <FadeIn delay={0.25}>
        <GlassCard hover={false} className="space-y-6">
          <div className="flex items-center gap-3">
            <Key size={20} className="text-gold" />
            <h2 className="text-lg font-semibold text-text-primary">
              API Keys
            </h2>
          </div>
          <Separator className="bg-glass-border" />
          <div className="space-y-2">
            <Label className="text-text-secondary">Gemini API Key</Label>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter your Gemini API key"
                className="bg-white/5 border-glass-border text-text-primary focus:border-gold/50"
              />
              <Button
                onClick={() => toast.success("API key saved")}
                variant="outline"
                className="border-glass-border text-text-secondary hover:text-text-primary hover:bg-white/5 shrink-0"
              >
                Save
              </Button>
            </div>
            <p className="text-xs text-text-muted">
              Required for AI analysis features. Get one at{" "}
              <a
                href="https://aistudio.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>
        </GlassCard>
      </FadeIn>

      {/* Danger Zone */}
      <FadeIn delay={0.3}>
        <div className="rounded-2xl border-2 border-red-500/20 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Trash2 size={20} className="text-red-400" />
            <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
          </div>
          <p className="text-sm text-text-secondary">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <Button
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            onClick={() => toast.error("This feature is not available in demo mode")}
          >
            Delete Account
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}
