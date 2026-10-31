import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | Togetherly",
  description:
    "Log in to Togetherly to discover events, connect with your community, and create meaningful experiences together.",
};

export default function LoginPage() {
  return <LoginForm />;
}
