import { WorkoutsContext } from "../context/WorkoutsContext";
import { useContext } from "react";

export const useWorkoutsContext = ()=>{
  const context = useContext(WorkoutsContext)

  if(!context) {
    throw Error('useWorkoutsContex should be used inside the WorkoutsContextProvider')
  }
  return context
}