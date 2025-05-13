import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Logo } from "@/components/Logo";

export const AuthForms = ({ defaultTab = "login" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { login, register } = useAuth();
  
  // Login form state
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  
  // Register form state
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "leader",
  });
  const [registerErrors, setRegisterErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
    
    // Clear error when typing
    if (loginErrors[name]) {
      setLoginErrors({
        ...loginErrors,
        [name]: "",
      });
    }
  };

  // Handle register form changes
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterValues({
      ...registerValues,
      [name]: value,
    });
    
    // Clear error when typing
    if (registerErrors[name]) {
      setRegisterErrors({
        ...registerErrors,
        [name]: "",
      });
    }
  };

  // Handle role selection change
  const handleRoleChange = (value) => {
    setRegisterValues({
      ...registerValues,
      role: value,
    });
  };

  // Validate login form
  const validateLoginForm = () => {
    const errors = {
      email: "",
      password: "",
    };
    
    // Email validation
    if (!loginValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginValues.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!loginValues.password) {
      errors.password = "Password is required";
    } else if (loginValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setLoginErrors(errors);
    return !errors.email && !errors.password;
  };

  // Validate register form
  const validateRegisterForm = () => {
    const errors = {
      name: "",
      email: "",
      password: "",
      role: "",
    };
    
    // Name validation
    if (!registerValues.name) {
      errors.name = "Name is required";
    } else if (registerValues.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    // Email validation
    if (!registerValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerValues.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!registerValues.password) {
      errors.password = "Password is required";
    } else if (registerValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setRegisterErrors(errors);
    return !errors.name && !errors.email && !errors.password && !errors.role;
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (validateLoginForm()) {
      setIsLoginSubmitting(true);
      try {
        await login(loginValues.email, loginValues.password);
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsLoginSubmitting(false);
      }
    }
  };

  // Handle register form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (validateRegisterForm()) {
      setIsRegisterSubmitting(true);
      try {
        await register(
          registerValues.name,
          registerValues.email,
          registerValues.password,
          registerValues.role
        );
      } catch (error) {
        console.error("Registration error:", error);
      } finally {
        setIsRegisterSubmitting(false);
      }
    }
  };

  return (
    <Card className="w-full max-w-md devotional-card">
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto">
          <Logo size="large" />
        </div>
        <CardTitle className="text-2xl font-bold devotional-gradient-text">
          Welcome to Sai Balaji Dashboard
        </CardTitle>
        <CardDescription>
          Manage devotional services and team activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex mb-6">
          <Button
            variant={activeTab === "login" ? "default" : "outline"}
            onClick={() => setActiveTab("login")}
            className={`flex-1 ${
              activeTab === "login"
              ? "bg-devotional-gold hover:bg-devotional-orange"
              : ""
            }`}
          >
            Login
          </Button>
          <Button
            variant={activeTab === "register" ? "default" : "outline"}
            onClick={() => setActiveTab("register")}
            className={`flex-1 ${
              activeTab === "register"
              ? "bg-devotional-gold hover:bg-devotional-orange"
              : ""
            }`}
          >
            Register
          </Button>
        </div>

        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="login-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={loginValues.email}
                onChange={handleLoginChange}
                className="border-devotional-gold/30 focus:border-devotional-gold"
              />
              {loginErrors.email && (
                <p className="text-sm text-red-500">{loginErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="login-password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="login-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={loginValues.password}
                onChange={handleLoginChange}
                className="border-devotional-gold/30 focus:border-devotional-gold"
              />
              {loginErrors.password && (
                <p className="text-sm text-red-500">{loginErrors.password}</p>
              )}
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full devotional-button"
                disabled={isLoginSubmitting}
              >
                {isLoginSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
            
            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Demo credentials:
              </p>
              <p className="text-xs text-muted-foreground">
                Admin: admin@example.com / admin123
              </p>
              <p className="text-xs text-muted-foreground">
                Leader: leader@example.com / leader123
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="register-name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="register-name"
                name="name"
                placeholder="Enter your name"
                value={registerValues.name}
                onChange={handleRegisterChange}
                className="border-devotional-gold/30 focus:border-devotional-gold"
              />
              {registerErrors.name && (
                <p className="text-sm text-red-500">{registerErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="register-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="register-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={registerValues.email}
                onChange={handleRegisterChange}
                className="border-devotional-gold/30 focus:border-devotional-gold"
              />
              {registerErrors.email && (
                <p className="text-sm text-red-500">{registerErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="register-password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="register-password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={registerValues.password}
                onChange={handleRegisterChange}
                className="border-devotional-gold/30 focus:border-devotional-gold"
              />
              {registerErrors.password && (
                <p className="text-sm text-red-500">{registerErrors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="register-role" className="text-sm font-medium">
                Role
              </label>
              <Select
                value={registerValues.role}
                onValueChange={handleRoleChange}
              >
                <SelectTrigger id="register-role" className="border-devotional-gold/30">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="leader">Team Leader</SelectItem>
                </SelectContent>
              </Select>
              {registerErrors.role && (
                <p className="text-sm text-red-500">{registerErrors.role}</p>
              )}
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full devotional-button" 
                disabled={isRegisterSubmitting}
              >
                {isRegisterSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground text-center">
          By continuing, you agree to our terms of service and privacy policy.
        </p>
      </CardFooter>
    </Card>
  );
};