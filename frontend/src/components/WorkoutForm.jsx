import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

export default function WorkoutForm(){
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyField, setEmptyField] = useState([])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    
    if(!user){
      setError('You must be logged in')
      return
    }

    const workout = {title, reps, load}

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if(!response.ok){
      setError(json.error)
      setEmptyField(json.emptyField)
      return
    }
    if(response.ok){
      setTitle('')
      setReps('')
      setLoad('')
      setError(null)
      setEmptyField([])
      console.log('New Workout Added', json)
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return(
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise Title: </label>
      <input 
        type="text" 
        onChange={e=> setTitle(e.target.value)}
        value={title}    
        className={emptyField.includes('title') ? 'error' : ''}
      />

      <label>Reps: </label>
      <input 
        type="number" 
        onChange={e=> setReps(e.target.value)}
        value={reps}
        className={emptyField.includes('reps') ? 'error' : ''}
      />

      <label>Load (in kg): </label>
      <input 
        type="number" 
        onChange={e=>setLoad(e.target.value)}
        value={load}
        className={emptyField.includes('load') ? 'error' : ''}
        />

      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}