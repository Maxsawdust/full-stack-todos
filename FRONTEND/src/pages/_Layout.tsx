import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { NavBar } from "../components";
import { useAppDispatch } from "../store/hooks/hooks";
import { setLists } from "../store/reducers/listReducer";

export default function _Layout() {
  const location = useLocation();

  const dispatch = useAppDispatch();
  // useEffect to navigate the user to "/home" if they've got an active session
  useEffect(() => {
    // clear the lists on app load
    dispatch(setLists([]));
  }, []);

  return (
    <>
      {location.pathname.includes("/dashboard") && <NavBar />}
      <Outlet />
    </>
  );
}
