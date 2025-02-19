import { createContext, useEffect, useState } from "react";
import "./App.css";
import Editor from "./components/organisms/Editor";
import Nav from "./components/organisms/Nav";
import { testNotes } from "./util";

export const MultiContext = createContext();

function App() {
  const [notes, setNotes] = useState(testNotes);
  const [currentNote, setCurrentNote] = useState(null);

  const contextValue = {
    notes: notes,
    setNotes: setNotes,
    currentNote: currentNote,
    setCurrentNote: setCurrentNote,
  };

  useEffect(() => {
    notes.length > 0 && setCurrentNote(notes[0]);
  }, [notes]);

  return (
    <MultiContext.Provider value={contextValue}>
      <div className="body">
        <div className="w-20 left">
          <Nav />
        </div>
        {currentNote && (
          <div className="w-80">
            <Editor />
          </div>
        )}
      </div>
    </MultiContext.Provider>
  );
}

export default App;
