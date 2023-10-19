
import React, {useState} from 'react'
import Swal from "sweetalert2"

const AddTask = ({onSave}) => {
    const [text, setText] = useState('');
  const [day, setDay] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text && !day) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Fill in your task and description or close the form!'
        })
    } else if (!text && day) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Fill in your task!'
        })
    } else if (text && !day) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Fill in your description!'
        })
    } else {
        onSave({ text, day });
    }
    
    setText('');
    setDay('');
}

  return (
    <div>
 <form className="add-form" onSubmit={onSubmit}>
          <div className="form-control">
              <label>Task Title</label>
              <input type="text" placeholder="add task" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className="form-control">
              <label>Description </label>
              <input type="text" placeholder="description" value={day} onChange={(e) => setDay(e.target.value)} />
          </div>
          <input type="submit" className="btn btn-block" value="Save Task" />
      </form>
    </div>
  )
}

export default AddTask