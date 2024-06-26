import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter hook
import { useLockedBody } from "../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import { WrapperLayout } from "./layout.styles";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [_, setLocked] = useLockedBody(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user_email = localStorage.getItem("user_email");
    if (user_email) {
      setLoggedIn(true);
    }
  }, []); // Empty dependency array to ensure this effect runs only once on component mount

  const authenticate = () => {
    const hardCodedEmail = "admin@gmail.com";
    const hardCodedPassword = "admin@123";

    if (email === hardCodedEmail && password === hardCodedPassword) {
      setLoggedIn(true);
      router.push("/");
      localStorage.setItem("user_email", email); // Store the email in localStorage
    } else {
      setError("Invalid email or password");
    }
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <>
      {loggedIn ? (
        <SidebarContext.Provider
          value={{
            collapsed: sidebarOpen,
            setCollapsed: handleToggleSidebar,
          }}
        >
          <WrapperLayout>
            <SidebarWrapper />
            <NavbarWrapper>{children}</NavbarWrapper>
          </WrapperLayout>
        </SidebarContext.Provider>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            marginLeft: "0vh",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                authenticate();
              }}
            >
              <h2>Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#007bff",
                  color: "#ffffff",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
              {error && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};
