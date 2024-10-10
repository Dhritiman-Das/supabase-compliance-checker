import Link from "next/link";
import Image from "next/image";
import React from "react";

type AppLogoProps = {
  size?: "sm" | "md" | "lg";
};

export default function AppLogo({ size = "md" }: AppLogoProps) {
  const iconSize =
    {
      sm: 16,
      md: 24,
      lg: 32,
    }[size] || 24;

  const textSize =
    {
      sm: "text-sm",
      md: "",
      lg: "text-xl",
    }[size] || "";

  return (
    <Link href="/">
      <div className={`flex items-center gap-2 ml-2 ${textSize}`}>
        <Image src="/me.jpg" alt="Logo" height={iconSize} width={iconSize} />
        <p className="font-semibold tracking-wider">SCC</p>
      </div>
    </Link>
  );
}
