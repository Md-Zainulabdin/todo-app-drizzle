import SearchBar from "@/components/CreateBar";
import TodoList from "@/components/Todos";

const Home: React.FC = () => {
  return (
    <div className="w-full sm:w-[70%] md:w-[35%] h-[500px] shadow-lg rounded-lg border">
      <div className="flex p-4 w-full h-full flex-col justify-between items-center">
        <div className="w-full h-[85%] overflow-y-scroll overflow-x-hidden">
          <TodoList />
        </div>
        <div className="py-3">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
