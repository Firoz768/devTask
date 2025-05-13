
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";

export const ExpensesChart: React.FC = () => {
  const { tasks } = useApp();

  // Calculate total expenses by category
  const totalExpenses = tasks.reduce(
    (acc, task) => {
      return {
        food: acc.food + task.expenses.food,
        accommodation: acc.accommodation + task.expenses.accommodation,
        water: acc.water + task.expenses.water,
        other: acc.other + task.expenses.other
      };
    },
    { food: 0, accommodation: 0, water: 0, other: 0 }
  );

  // Prepare data for the chart
  const data = [
    { name: "Food", value: totalExpenses.food },
    { name: "Accommodation", value: totalExpenses.accommodation },
    { name: "Water", value: totalExpenses.water },
    { name: "Other", value: totalExpenses.other }
  ].filter(item => item.value > 0);

  const COLORS = ["#FFC107", "#FF9933", "#FF6600", "#800000"];

  return (
    <Card className="devotional-card">
      <CardHeader>
        <CardTitle className="text-devotional-maroon">Expenses Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
