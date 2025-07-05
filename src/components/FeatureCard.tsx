import type { LucideIcon } from "lucide-react";
import React from "react";

interface FeatureCardProps {
  icon: LucideIcon;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon }) => (
  <div className="gradient-border p-6 card-hover">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-primary-/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </div>
);

export default FeatureCard;
