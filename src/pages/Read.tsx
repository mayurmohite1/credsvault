import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FileLock2, KeyRound, Edit2, Trash2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contractABI, contractAddress } from "./contractConfig";

interface Note {
  id: number;
  content: string;
  timestamp: number;
}

const Read: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [, setIsLoading] = useState(false);
  const [editLoading, setEditLoading] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const initWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const signer = provider.getSigner();
          setWalletAddress(accounts[0]);
          const contractInstance = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setContract(contractInstance);
        }
      }
    };

    initWallet();
  }, []);

  useEffect(() => {
    if (walletAddress) fetchNotes();
  }, [walletAddress]);

  const fetchNotes = async () => {
    if (!contract) return alert("Please connect your wallet first!");
    setIsLoading(true);

    try {
      const notes = await contract.getAllNotes();
      const formattedNotes: Note[] = notes[0].map(
        (id: number, index: number) => ({
          id,
          content: notes[1][index],
          timestamp: Number(notes[2][index]) * 1000,
        })
      );
      const sortedNotes = formattedNotes.sort(
        (a, b) => b.timestamp - a.timestamp
      );
      setNotes(sortedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const startEdit = (note: Note) => {
    setIsEditing(note.id);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditContent("");
  };

  const handleEdit = async (id: number) => {
    if (!editContent.trim() || !contract) return;
    setEditLoading(id);

    try {
      const tx = await contract.editNote(id, editContent);
      await tx.wait();
      await fetchNotes();
      setIsEditing(null);
      setEditContent("");
    } catch (error) {
      console.error("Error editing note:", error);
    } finally {
      setEditLoading(null);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contractInstance);
    }
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <nav className="relative flex items-center justify-between p-4 backdrop-blur-sm bg-gray-900/50">
        <div
          className="flex items-center space-x-1 cursor-pointer"
          onClick={navigateToHome}
        >
          <FileLock2 className="h-7 w-8 text-emerald-400" />
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            CredsVault
          </span>
        </div>
        <div className="flex space-x-6">
          {!walletAddress ? (
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-2 rounded-lg transition-all duration-300 hover:from-emerald-500 hover:to-cyan-600 text-white"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-lg px-4 py-2 rounded-lg border border-gray-700/50">
              <KeyRound className="h-4 w-4 text-emerald-400" />
              <span className="text-gray-300 text-sm">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
          )}
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Stored Credentials
            </h2>
          </div>

          <div className="space-y-4">
            {notes.length > 0 ? (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 
                  transform transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                >
                  {isEditing === note.id ? (
                    <div className="space-y-4">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-4 bg-gray-900/50 text-white rounded-lg resize-none focus:ring-2 focus:ring-emerald-500/50 focus:outline-none"
                        rows={4}
                      />
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(note.id)}
                          disabled={editLoading === note.id}
                          className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-2 rounded-lg
                          transition-all duration-300 hover:from-emerald-500 hover:to-cyan-600"
                        >
                          <Save
                            className={`h-4 w-4 ${
                              editLoading === note.id ? "animate-spin" : ""
                            }`}
                          />
                          <span>
                            {editLoading === note.id ? "Saving..." : "Save"}
                          </span>
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center space-x-2 bg-gray-700/50 px-4 py-2 rounded-lg
                          transition-all duration-300 hover:bg-gray-600/50 text-emerald-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-300 mb-2">{note.content}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm">
                          {new Date(note.timestamp).toLocaleString()}
                        </p>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => startEdit(note)}
                            className="flex items-center space-x-2 bg-gray-700/50 px-3 py-1 rounded-lg
                            transition-all duration-300 hover:bg-gray-600/50"
                          >
                            <Edit2 className="h-4 w-4 text-emerald-400" />
                            <span className="text-emerald-400">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(note.id)}
                            className="flex items-center space-x-2 bg-red-500/20 px-3 py-1 rounded-lg
                            transition-all duration-300 hover:bg-red-500/30"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                            <span className="text-emerald-400">Delete</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">
                  No credentials found. Connect your wallet and fetch your
                  stored data.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Read;
