import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "../store/hooks/hooks";
import { Button, Heading, NoLists, SubHeading, TodoCard } from "../components";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const lists = useAppSelector((state) => state.listReducer.lists);
  const { _id } = useParams();

  useEffect(() => {
    // if there are lists
    if (lists && lists.length > 0) {
      //  and there's no _id from params
      // OR the lists array no longer contains the _id in params
      if (!_id || !lists.some((list) => list._id === _id)) {
        // user needs to be navigated to the first list in the lists array
        navigate(`/dashboard/${lists[0]._id}`);
        console.log("navigating");
      }
    }
  }, [lists]);

  //if there's no lists, display the no lists page
  if (!lists || lists.length === 0) {
    return <NoLists />;
  }

  const addTodo = () => {
    try {
      //
    } catch (err: any) {
      console.error("error", err.message);
    }
  };

  const list = lists.find((list) => list._id === _id)!;

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="flex-1 w-4/5 py-20 flex flex-col gap-30">
        <Heading big>{list.title}</Heading>

        <div className=" w-full min-h-4/5 flex flex-col items-center bg-[#d4d4d4] rounded-xl">
          <div className="top-0 w-full h-1/5 px-10 flex items-center rounded-t-xl bg-[#c4c4c4]">
            <Button onClick={addTodo}>Add Todo</Button>
          </div>

          <div className="w-full h-full flex flex-col justify-center items-center">
            {list.content.length > 0 ? (
              list.content.map((todo) => {
                return <TodoCard todo={todo} />;
              })
            ) : (
              <div>
                <Heading>No Todos!</Heading>
                <SubHeading>Press "Add Todo" to add a todo</SubHeading>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
