import Sidebar from "../components/sidebar";
import Questions from "./questions";

export const Home = () => {
  return (
    <main className="flex justify-between">
      <div className="hidden md:block px-2 py-4 border-0 border-gray-100 border-r-2">
        <Sidebar />
      </div>
      <div className="flex flex-col gap-2 pt-4 pl-2 w-full">
        <Questions />
      </div>
    </main>
  );
};
