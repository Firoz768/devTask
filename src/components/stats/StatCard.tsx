
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
}) => {
  return (
    <Card className="devotional-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-devotional-gold">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold devotional-gradient-text">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};
