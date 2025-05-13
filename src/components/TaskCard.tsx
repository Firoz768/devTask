
import React, { useState } from "react";
import { Task, TeamMember } from "@/types";
import { useApp } from "@/context/AppContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckIcon,
  ImageIcon,
  Calendar,
  User,
} from "lucide-react";

interface TaskCardProps {
  task: Task;
  viewMode?: "admin" | "leader";
  place?: { name: string; location: string };
  assignedMember?: TeamMember;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  viewMode = "leader",
  place,
  assignedMember,
}) => {
  const { 
    updateTaskProgress, 
    updateTaskStatus, 
    updateTaskExpenses, 
    uploadTaskImage,
    teamMembers,
    assignTask
  } = useApp();

  const [progress, setProgress] = useState(task.progress);
  const [expenses, setExpenses] = useState({
    food: task.expenses.food,
    accommodation: task.expenses.accommodation,
    water: task.expenses.water,
    other: task.expenses.other,
  });

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setProgress(value);
  };

  const saveProgress = () => {
    updateTaskProgress(task.id, progress);
  };

  const handleExpenseChange = (type: keyof typeof expenses, value: string) => {
    const numValue = parseInt(value) || 0;
    setExpenses((prev) => ({ ...prev, [type]: numValue }));
  };

  const saveExpenses = () => {
    updateTaskExpenses(task.id, expenses);
  };

  const handleImageUpload = (
    imageType: "startImage" | "endImage",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, this would upload the file to a server
    // Here we're creating a fake URL
    const mockUrl = `https://images.unsplash.com/photo-${Date.now()}`;
    uploadTaskImage(task.id, imageType, mockUrl);
  };

  const handleStatusChange = (status: Task["status"]) => {
    updateTaskStatus(task.id, status);
  };

  const handleAssignMember = (memberId: string) => {
    assignTask(task.id, memberId);
  };

  const totalExpenses =
    expenses.food + expenses.accommodation + expenses.water + expenses.other;

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "approved":
        return "bg-purple-100 text-purple-800";
      case "paid":
        return "bg-devotional-gold/20 text-devotional-maroon";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="devotional-card h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-devotional-maroon">
            {task.title}
          </CardTitle>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              task.status
            )}`}
          >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>
        <CardDescription className="text-sm">
          {place ? `${place.name}, ${place.location}` : "Loading place..."}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex items-center text-sm mb-2">
            <Calendar size={14} className="mr-1 text-devotional-gold" />
            <span className="text-gray-600">
              {task.startDate} to {task.endDate}
            </span>
          </div>

          {assignedMember && (
            <div className="flex items-center text-sm mb-3">
              <User size={14} className="mr-1 text-devotional-gold" />
              <span className="text-gray-600">
                Assigned to: {assignedMember.name}
              </span>
            </div>
          )}

          <p className="text-sm mb-3">{task.description}</p>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-devotional-maroon">{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-2" />
          </div>

          {task.expenses && (
            <div className="mt-3">
              <h4 className="text-sm font-medium mb-1">Expenses</h4>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Food:</span>
                  <span>₹{task.expenses.food.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accommodation:</span>
                  <span>₹{task.expenses.accommodation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Water:</span>
                  <span>₹{task.expenses.water.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Other:</span>
                  <span>₹{task.expenses.other.toLocaleString()}</span>
                </div>
                <Separator className="my-1" />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>₹{(
                    task.expenses.food +
                    task.expenses.accommodation +
                    task.expenses.water +
                    task.expenses.other
                  ).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3 pt-3 border-t border-devotional-gold/20">
        {viewMode === "leader" ? (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-devotional-gold/30 hover:bg-devotional-gold/10"
                >
                  Update Progress
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Task Progress</DialogTitle>
                  <DialogDescription>
                    Adjust the progress percentage and update task expenses.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Progress (%)</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                        className="border-devotional-gold/30"
                      />
                      <span>{progress}%</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Expenses (₹)</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs">Food</label>
                        <Input
                          type="number"
                          min="0"
                          value={expenses.food}
                          onChange={(e) => handleExpenseChange("food", e.target.value)}
                          className="border-devotional-gold/30"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs">Accommodation</label>
                        <Input
                          type="number"
                          min="0"
                          value={expenses.accommodation}
                          onChange={(e) => handleExpenseChange("accommodation", e.target.value)}
                          className="border-devotional-gold/30"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs">Water</label>
                        <Input
                          type="number"
                          min="0"
                          value={expenses.water}
                          onChange={(e) => handleExpenseChange("water", e.target.value)}
                          className="border-devotional-gold/30"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs">Other</label>
                        <Input
                          type="number"
                          min="0"
                          value={expenses.other}
                          onChange={(e) => handleExpenseChange("other", e.target.value)}
                          className="border-devotional-gold/30"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="font-medium">Total:</span>
                      <span>₹{totalExpenses.toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Upload Images</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs">Start Image</label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload("startImage", e)}
                            className="border-devotional-gold/30"
                          />
                          {task.startImage && (
                            <CheckIcon size={16} className="text-green-600" />
                          )}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs">End Image</label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload("endImage", e)}
                            className="border-devotional-gold/30"
                          />
                          {task.endImage && (
                            <CheckIcon size={16} className="text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    className="devotional-button"
                    onClick={() => {
                      saveProgress();
                      saveExpenses();
                    }}
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {!task.assignedTo && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-devotional-gold/30 hover:bg-devotional-gold/10"
                  >
                    Assign Team Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Team Member</DialogTitle>
                    <DialogDescription>
                      Select a team member to assign to this task.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="py-4">
                    <Select onValueChange={handleAssignMember}>
                      <SelectTrigger className="border-devotional-gold/30">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} - {member.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <DialogFooter>
                    <Button type="submit" className="devotional-button">
                      Assign Member
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </>
        ) : (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-devotional-gold/30 hover:bg-devotional-gold/10"
                >
                  <ImageIcon size={16} className="mr-2" /> View Images
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Task Images</DialogTitle>
                  <DialogDescription>
                    Start and end images uploaded by the team leader.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Start Image</h4>
                    {task.startImage ? (
                      <div className="border border-devotional-gold/30 rounded-md overflow-hidden">
                        <img
                          src={task.startImage}
                          alt="Start of work"
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-40 bg-muted rounded-md text-muted-foreground">
                        No image uploaded
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">End Image</h4>
                    {task.endImage ? (
                      <div className="border border-devotional-gold/30 rounded-md overflow-hidden">
                        <img
                          src={task.endImage}
                          alt="End of work"
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-40 bg-muted rounded-md text-muted-foreground">
                        No image uploaded
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {task.status === "completed" && (
              <Button
                className="w-full devotional-button"
                onClick={() => handleStatusChange("approved")}
              >
                Approve Task
              </Button>
            )}

            {task.status === "approved" && (
              <Button
                className="w-full devotional-button"
                onClick={() => handleStatusChange("paid")}
              >
                Process Payment
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};
