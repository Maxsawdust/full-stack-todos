import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { useEffect, useState } from "react";
import {
  setListBeingEdited,
  setTodoBeingAdded,
} from "../store/reducers/listReducer";
import { DashboardLoading } from "./";
import {
  Button,
  Heading,
  NoLists,
  SubHeading,
  TodoCard,
  TodoInput,
} from "../components";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const lists = useAppSelector((state) => state.listReducer.lists);
  const { _id } = useParams();
  const dispatch = useAppDispatch();

  const todoBeingAdded = useAppSelector(
    (state) => state.listReducer.todoBeingAdded
  );

  useEffect(() => {
    // if there are lists
    if (lists && lists.length > 0) {
      //  and there's no _id from params
      // OR the lists array no longer contains the _id in params
      if (!_id || !lists.some((list) => list._id === _id)) {
        // global store needs to be updated to reflect _id of zero indexed list
        dispatch(setListBeingEdited(lists[0]._id));
        // user needs to be navigated to the first list in the lists array
        navigate(`/dashboard/${lists[0]._id}`);
        console.log("navigating");
      }
      // if there is an _id from params, that's the list being edited
      if (_id) {
        dispatch(setListBeingEdited(_id));
      }
    }

    setIsLoading(false);
  }, [lists]);

  //if there's no lists, display the no lists page
  if (!lists || lists.length === 0) {
    return <NoLists />;
  }

  const addTodo = () => {
    // display the TodoInput component
    dispatch(setTodoBeingAdded(true));
  };

  const list = lists.find((list) => list._id === _id);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!list) {
    return <NoLists />; // or a loading state
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="flex-1 w-4/5 py-20 flex flex-col gap-30">
        <Heading big>{list.title}</Heading>

        <div className=" w-full min-h-4/5  flex flex-col items-center bg-[#d4d4d4] rounded-xl">
          <div className="top-0 w-full h-1/5 px-10 flex items-center rounded-t-xl bg-[#c4c4c4]">
            <Button onClick={addTodo}>Add Todo</Button>
          </div>

          <div className="w-full h-full p-8 flex flex-col gap-4">
            {/* if there is list content then map through the todos and display them */}
            {list.content.length > 0 &&
              list.content.map((todo) => {
                return <TodoCard todo={todo} />;
              })}

            {/* if there's no list content and a todo is not being added, display this */}
            {list.content.length === 0 && !todoBeingAdded && (
              <div>
                <Heading>No Todos!</Heading>
                <SubHeading>Press "Add Todo" to add a todo</SubHeading>
              </div>
            )}

            {/* if a todo is being added, show the input for it */}
            {todoBeingAdded && <TodoInput listId={list._id!} />}
          </div>
        </div>
      </div>
    </div>
  );
}
