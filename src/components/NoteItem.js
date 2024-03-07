import { useContext, React } from "react";
import NoteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const { note, updateNote} = props;
  const {deleteNote} = useContext(NoteContext)
  const noteDelete =()=>{
    deleteNote(note._id)
    props.showAlert("note is Deleted","success")
  }
 

  return (
    <div className="col-md-3  mt-3 ">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex align-items-center"></div>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          <i className="fa-solid fa-trash mx-2" onClick={noteDelete}></i>
        </div>
      </div>
    </div>
  );
}
