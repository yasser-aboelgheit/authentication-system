import Header from "../components/ui/Header";
import { useAuth } from "../context/AuthContext";

const Application = () => {
  const { userName, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome {userName ?? "Guest"}!</h1>
      </main>
    </div>
  );
};

export default Application;
