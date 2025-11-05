import React from "react";
import { MainLayout } from "../components/layout/mainLayout";

interface DashboardProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Dashboard: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
  return <MainLayout setIsAuthenticated={setIsAuthenticated} />;
};
