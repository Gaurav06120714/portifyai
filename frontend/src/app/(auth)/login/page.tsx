"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "@/context/ThemeContext";

export default function LoginPage() {
  const { isLight } = useTheme();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h1
          className="text-2xl font-bold transition-colors duration-300"
          style={{ color: isLight ? "#1a1a2e" : "#e8e8f0" }}
        >
          Welcome back
        </h1>
        <p
          className="mt-1 text-sm transition-colors duration-300"
          style={{ color: isLight ? "#666688" : "#7777aa" }}
        >
          Sign in to your PortifyAI account
        </p>
      </div>
      <SignIn
        routing="hash"
        signUpUrl="/register"
        fallbackRedirectUrl="/dashboard"
        appearance={{
          variables: {
            colorBackground: isLight ? "#ffffff" : "#13131e",
            colorInputBackground: isLight ? "#f5f5f7" : "#1a1a2e",
            colorInputText: isLight ? "#1a1a2e" : "#e8e8f0",
            colorText: isLight ? "#1a1a2e" : "#e8e8f0",
            colorTextSecondary: isLight ? "#666688" : "#7777aa",
            colorPrimary: "#6c63ff",
            colorDanger: "#ff4d4d",
            borderRadius: "10px",
            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
          },
          elements: {
            rootBox: "w-full",
            card: `w-full shadow-lg rounded-2xl border transition-colors duration-300 ${
              isLight
                ? "bg-white border-[rgba(0,0,0,0.08)] shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
                : "bg-[#13131e] border-[rgba(108,99,255,0.15)] shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            }`,
            formButtonPrimary:
              "bg-[#6c63ff] hover:bg-[#5a53e0] text-white font-semibold shadow-[0_0_16px_rgba(108,99,255,0.3)]",
            socialButtonsBlockButton: isLight
              ? "border-[rgba(0,0,0,0.1)] bg-[#f5f5f7] text-[#1a1a2e] hover:bg-[#ebebf0]"
              : "border-[rgba(108,99,255,0.2)] bg-[#1a1a2e] text-[#e8e8f0] hover:bg-[rgba(108,99,255,0.1)]",
            footerActionLink: "text-[#6c63ff] hover:text-[#8b84ff]",
            formFieldInput: isLight
              ? "bg-[#f5f5f7] border-[rgba(0,0,0,0.1)] text-[#1a1a2e] focus:border-[#6c63ff]"
              : "bg-[#1a1a2e] border-[rgba(108,99,255,0.2)] text-[#e8e8f0] focus:border-[#6c63ff]",
          },
        }}
      />
    </div>
  );
}
