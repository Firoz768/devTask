
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["admin", "leader"]),
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

interface AuthFormsProps {
  defaultTab?: "login" | "register";
}

export const AuthForms: React.FC<AuthFormsProps> = ({ defaultTab = "login" }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const { login, register } = useAuth();

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "leader",
    },
  });

  const onLoginSubmit = async (values: LoginValues) => {
    await login(values.email, values.password);
  };

  const onRegisterSubmit = async (values: RegisterValues) => {
    await register(values.name, values.email, values.password, values.role);
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
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        {...field} 
                        className="border-devotional-gold/30 focus:border-devotional-gold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        {...field}
                        className="border-devotional-gold/30 focus:border-devotional-gold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full devotional-button"
                  disabled={loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? "Logging in..." : "Login"}
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
          </Form>
        ) : (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your name" 
                        {...field}
                        className="border-devotional-gold/30 focus:border-devotional-gold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        {...field}
                        className="border-devotional-gold/30 focus:border-devotional-gold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Create a password" 
                        {...field}
                        className="border-devotional-gold/30 focus:border-devotional-gold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-devotional-gold/30">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="leader">Team Leader</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full devotional-button" 
                  disabled={registerForm.formState.isSubmitting}
                >
                  {registerForm.formState.isSubmitting ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>
          </Form>
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
