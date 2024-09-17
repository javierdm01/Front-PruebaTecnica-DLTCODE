'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  

  useEffect(() => {
    // Redirigir a /dashboard/criaturas cuando se monte el componente
    
    router.push("/dashboard/criaturas");
  }, [router]);

  return null; // No necesitamos renderizar nada porque estamos redirigiendo
};

export default DashboardPage;