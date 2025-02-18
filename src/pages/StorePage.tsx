import React, { useState } from "react";
import { Save, FileText, FileLock2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Note {
  id: string;
  content: string;
  timestamp: Date;
}

const StorePage: React.FC = () => {
  const [noteContent, setNoteContent] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  const handleStore = () => {
    if (noteContent.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        content: noteContent,
        timestamp: new Date(),
      };
      setSavedNotes([...savedNotes, newNote]);
      setNoteContent("");
    }
  };

  const handleRead = () => {
    console.log("Saved notes:", savedNotes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative flex items-center justify-between p-6 backdrop-blur-sm bg-gray-900/50 animate-fade-in-down">
        <div
          className="flex items-center space-x-2 animate-slide-in-left cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FileLock2 className="h-9 w-9 text-emerald-400 animate-spin-slow" />
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 animate-text-shimmer">
            CredsVault
          </span>
        </div>
        <div className="flex space-x-6 animate-slide-in-right">
          {/* @ts-expect-error msg */}
          <appkit-button />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6 relative">
        <div className="text-center animate-fade-in-down">
          {/* <KeyRound className="h-12 w-12 text-emerald-400 mx-auto mb-4 animate-bounce-slow" /> */}
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-8 animate-text-shimmer">
            Write Your Credentials
          </h1>
        </div>

        <div
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 mb-6 border border-gray-700/50 
          transform transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10
          animate-fade-in-up"
        >
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="w-full h-100 p-4 bg-gray-700/50 text-white rounded-lg 
              focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none
              transition-all duration-300 hover:bg-gray-700/70
              placeholder:text-gray-400 text-xl"
            placeholder="Write your credentials here..."
          />

          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleStore}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-cyan-500 
                px-6 py-2 rounded-lg text-white font-semibold 
                transition-all duration-300 transform hover:scale-105 
                hover:shadow-lg hover:shadow-emerald-500/25
                hover:from-emerald-500 hover:to-cyan-600
                animate-pulse-slow group"
            >
              <Save className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Store</span>
            </button>

            <button
              onClick={handleRead}
              className="flex items-center space-x-2 bg-gray-600/50 px-6 py-2 
                rounded-lg text-white font-semibold 
                transition-all duration-300 transform hover:scale-105
                hover:bg-gray-700/50 hover:shadow-lg
                group"
            >
              <FileText className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Read</span>
            </button>
          </div>
        </div>

        {/* Display saved notes with staggered animations */}
        <div className="space-y-4">
          {savedNotes.map((note, index) => (
            <div
              key={note.id}
              className={`bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 
                border border-gray-700/50 transform transition-all duration-300 
                hover:scale-102 hover:shadow-lg hover:shadow-emerald-500/10
                animate-slide-in-right`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <p className="text-white">{note.content}</p>
              <p className="text-sm text-gray-400 mt-2 animate-pulse-slow">
                {note.timestamp.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
