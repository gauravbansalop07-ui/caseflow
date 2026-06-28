import { GlowBackground } from "@/components/shared/animated-container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center mesh-gradient p-4">
      <GlowBackground />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
