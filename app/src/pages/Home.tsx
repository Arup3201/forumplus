import Sidebar from "../components/sidebar";
import Questions from "./questions";

export const Home = () => {
  return (
    <main className="flex justify-between">
      <Sidebar />
      <div className="flex flex-col gap-2 pt-4 pl-2 w-full">
        <Questions />
      </div>
    </main>
  );
};
