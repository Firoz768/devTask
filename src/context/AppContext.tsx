
import React, { createContext, useContext, useState, useEffect } from "react";
import { DevotionalPlace, Task, TeamMember, DayMusic } from "@/types";
import { toast } from "@/components/ui/sonner";

// Mock data for devotional places in South India
const initialPlaces: DevotionalPlace[] = [
  {
    id: "place-1",
    name: "Tirupati Balaji Temple",
    location: "Tirupati, Andhra Pradesh",
    description: "One of the most visited religious sites in the world dedicated to Lord Venkateswara.",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be"
  },
  {
    id: "place-2",
    name: "Meenakshi Amman Temple",
    location: "Madurai, Tamil Nadu",
    description: "Historic Hindu temple dedicated to Meenakshi, a form of Parvati.",
    image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098"
  },
  {
    id: "place-3",
    name: "Ramanathaswamy Temple",
    location: "Rameswaram, Tamil Nadu",
    description: "Famous pilgrimage site dedicated to Lord Shiva.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  },
  {
    id: "place-4",
    name: "Padmanabhaswamy Temple",
    location: "Thiruvananthapuram, Kerala",
    description: "Ancient temple dedicated to Lord Vishnu.",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3"
  }
];

// Mock data for team members
const initialTeamMembers: TeamMember[] = [
  {
    id: "member-1",
    name: "Arjun Sharma",
    role: "Photographer",
    avatar: "https://i.pravatar.cc/150?u=member-1"
  },
  {
    id: "member-2",
    name: "Priya Patel",
    role: "Coordinator",
    avatar: "https://i.pravatar.cc/150?u=member-2"
  },
  {
    id: "member-3",
    name: "Rahul Kumar",
    role: "Guide",
    avatar: "https://i.pravatar.cc/150?u=member-3"
  },
  {
    id: "member-4",
    name: "Deepa Nair",
    role: "Assistant",
    avatar: "https://i.pravatar.cc/150?u=member-4"
  }
];

// Mock data for initial tasks
const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Temple Photography Session",
    description: "Capture high-quality photographs of the temple architecture and surroundings",
    placeId: "place-1",
    assignedTo: "member-1",
    progress: 60,
    status: "in-progress",
    startDate: "2025-05-10",
    endDate: "2025-05-20",
    startImage: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    expenses: {
      food: 2000,
      accommodation: 5000,
      water: 500,
      other: 1000
    }
  },
  {
    id: "task-2",
    title: "Visitor Guide Creation",
    description: "Create an informative guide for temple visitors",
    placeId: "place-2",
    assignedTo: "member-3",
    progress: 30,
    status: "in-progress",
    startDate: "2025-05-05",
    endDate: "2025-05-25",
    startImage: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
    expenses: {
      food: 1500,
      accommodation: 4000,
      water: 300,
      other: 500
    }
  },
  {
    id: "task-3",
    title: "Ritual Documentation",
    description: "Document and explain various rituals performed at the temple",
    placeId: "place-3",
    progress: 0,
    status: "pending",
    startDate: "2025-05-20",
    endDate: "2025-06-10",
    expenses: {
      food: 0,
      accommodation: 0,
      water: 0,
      other: 0
    }
  }
];

// Daily devotional music data
const dayMusicData: DayMusic[] = [
  {
    day: "Monday",
    deity: "Lord Shiva",
    musicUrl: "https://www.youtube.com/watch?v=AcmH-gLM5VY"
  },
  {
    day: "Tuesday",
    deity: "Lord Hanuman",
    musicUrl: "https://www.youtube.com/watch?v=AETFvQonfV8"
  },
  {
    day: "Wednesday",
    deity: "Lord Ganesha",
    musicUrl: "https://www.youtube.com/watch?v=M9PQ3q4fFE0"
  },
  {
    day: "Thursday",
    deity: "Lord Vishnu",
    musicUrl: "https://www.youtube.com/watch?v=J4lU1t9K6-k"
  },
  {
    day: "Friday",
    deity: "Goddess Lakshmi",
    musicUrl: "https://www.youtube.com/watch?v=LsXdZzc7vBg"
  },
  {
    day: "Saturday",
    deity: "Lord Venkateswara",
    musicUrl: "https://www.youtube.com/watch?v=PhMcLBrGNmA"
  },
  {
    day: "Sunday",
    deity: "Lord Surya",
    musicUrl: "https://www.youtube.com/watch?v=HRlqNmhXNGc"
  }
];

interface AppContextType {
  places: DevotionalPlace[];
  tasks: Task[];
  teamMembers: TeamMember[];
  dayMusic: DayMusic[];
  currentDayMusic: DayMusic;
  
  // Task management
  addTask: (task: Omit<Task, "id" | "status" | "progress">) => void;
  updateTaskProgress: (taskId: string, progress: number) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
  updateTaskExpenses: (taskId: string, expenses: Partial<Task["expenses"]>) => void;
  uploadTaskImage: (taskId: string, imageType: "startImage" | "endImage", imageUrl: string) => void;
  assignTask: (taskId: string, memberId: string) => void;
}

const AppContext = createContext<AppContextType>({
  places: initialPlaces,
  tasks: initialTasks,
  teamMembers: initialTeamMembers,
  dayMusic: dayMusicData,
  currentDayMusic: dayMusicData[0],
  
  addTask: () => {},
  updateTaskProgress: () => {},
  updateTaskStatus: () => {},
  updateTaskExpenses: () => {},
  uploadTaskImage: () => {},
  assignTask: () => {}
});

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [places] = useState<DevotionalPlace[]>(initialPlaces);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [teamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [dayMusic] = useState<DayMusic[]>(dayMusicData);
  const [currentDayMusic, setCurrentDayMusic] = useState<DayMusic>(dayMusicData[0]);

  useEffect(() => {
    // Get current day of week
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = days[new Date().getDay()];
    
    // Set music for current day
    const todaysMusic = dayMusic.find(music => music.day === today) || dayMusic[0];
    setCurrentDayMusic(todaysMusic);
  }, [dayMusic]);

  const addTask = (task: Omit<Task, "id" | "status" | "progress">) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      status: "pending",
      progress: 0,
    };
    
    setTasks(prev => [...prev, newTask]);
    toast.success("New task created");
  };

  const updateTaskProgress = (taskId: string, progress: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              progress,
              // Update status based on progress
              status: progress >= 100 ? "completed" : progress > 0 ? "in-progress" : "pending"
            } 
          : task
      )
    );
    toast.success("Task progress updated");
  };

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    );
    toast.success(`Task status updated to ${status}`);
  };

  const updateTaskExpenses = (taskId: string, expenses: Partial<Task["expenses"]>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId
          ? { 
              ...task, 
              expenses: { ...task.expenses, ...expenses } 
            } 
          : task
      )
    );
    toast.success("Task expenses updated");
  };

  const uploadTaskImage = (taskId: string, imageType: "startImage" | "endImage", imageUrl: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId
          ? { 
              ...task, 
              [imageType]: imageUrl 
            } 
          : task
      )
    );
    toast.success(`Task ${imageType === "startImage" ? "start" : "end"} image uploaded`);
  };

  const assignTask = (taskId: string, memberId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, assignedTo: memberId } : task
      )
    );
    
    const member = teamMembers.find(m => m.id === memberId);
    toast.success(`Task assigned to ${member?.name || "team member"}`);
  };

  return (
    <AppContext.Provider 
      value={{ 
        places,
        tasks,
        teamMembers,
        dayMusic,
        currentDayMusic,
        addTask,
        updateTaskProgress,
        updateTaskStatus,
        updateTaskExpenses,
        uploadTaskImage,
        assignTask 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
