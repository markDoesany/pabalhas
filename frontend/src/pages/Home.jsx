import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

import { useWorkoutsContext} from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect } from 'react'

export default function Home(){
  const { workouts, dispatch} = useWorkoutsContext()
  const { user } = useAuthContext()

  useEffect(()=>{
    const fetchWorkout = async () =>{
      const response = await fetch('http://localhost:4000/api/workouts/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (response.ok) {
        const json = await response.json();
        dispatch({type: 'SET_WORKOUTS', payload: json})
      } else {
        console.error('Invalid response or content type');
      }
    }
    if(user){
      fetchWorkout()
    }

},[dispatch,user])

  return(
      <div className="home">
        <div className="workouts">
          {workouts && workouts.map(workout=>(
            <WorkoutDetails key={workout.id} workout={workout}/>
          ))}
        </div>
        <WorkoutForm/>
      </div>
    )
}