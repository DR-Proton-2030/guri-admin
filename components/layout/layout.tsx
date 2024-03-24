import React, { useState } from "react";
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
  const router = useRouter(); // Initialize useRouter hook
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [_, setLocked] = useLockedBody(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const authenticate = () => {
    const user_email = localStorage.getItem("user_email");
    if (user_email) {
      setLoggedIn(true);
      router.push("/");
    } else {
      const hardCodedEmail = "admin@gmail.com";
      const hardCodePassword = "admin@123";

      if (email === hardCodedEmail && password === hardCodePassword) {
        setLoggedIn(true);
        router.push("/"); // Redirect to home page upon successful login
        localStorage.setItem("use_email", email);
      } else {
        setError("Invalid email or password");
      }
    }
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <>
      <SidebarContext.Provider
        value={{
          collapsed: sidebarOpen,
          setCollapsed: handleToggleSidebar,
        }}
      >
        <WrapperLayout>
          <SidebarWrapper />
          {loggedIn ? (
            <NavbarWrapper>{children}</NavbarWrapper>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                marginLeft: "40vh",
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
        </WrapperLayout>
      </SidebarContext.Provider>
    </>
  );
};
