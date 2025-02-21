import React, { useState, useEffect } from "react";
import { Save, FileText, FileLock2, KeyRound, AlertCircle } from "lucide-react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { contractABI, contractAddress } from "./contractConfig";
import { Alert, AlertDescription } from "@/components/ui/alert";

const StorePage: React.FC = () => {
  const [noteContent, setNoteContent] = useState<string>("");
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isStoring, setIsStoring] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: "error" | "success";
  }>({
    show: false,
    message: "",
    type: "error",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const initWallet = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);

        const accounts = await web3Provider.listAccounts();
        if (accounts.length > 0) {
          const signer = web3Provider.getSigner();
          setSigner(signer);
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

  const showAlert = (message: string, type: "error" | "success" = "error") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
  };

  const connectWallet = async () => {
    if (!provider) {
      showAlert("MetaMask not detected!");
      return;
    }

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
      setWalletAddress(accounts[0]);

      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contractInstance);
      showAlert("Wallet connected successfully!", "success");
    } catch {
      showAlert("Failed to connect wallet. Please try again.");
    }
  };

  const handleStore = async () => {
    if (!contract) {
      showAlert("Please connect your wallet first!");
      return;
    }
    if (!noteContent.trim()) {
      showAlert("Note cannot be empty!");
      return;
    }

    try {
      setIsStoring(true);
      const tx = await contract.storeNote(noteContent);
      await tx.wait();
      setNoteContent("");
      showAlert("Credential stored successfully!", "success");
    } catch (error) {
      console.error("Error storing note:", error);
      showAlert("Failed to store note. Please try again.");
    } finally {
      setIsStoring(false);
    }
  };

  const navigateToRead = () => {
    if (!walletAddress) {
      showAlert("Please connect your wallet first!");
      return;
    }
    navigate("/read");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      {alert.show && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-down w-full max-w-md">
          <Alert
            className={`
            backdrop-blur-lg border shadow-lg
            ${
              alert.type === "error"
                ? "bg-red-500/10 border-red-500/50 text-red-400 shadow-red-500/10"
                : "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-emerald-500/10"
            }
          `}
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            <AlertDescription className="font-medium mt-1.5">
              {alert.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

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
            <appkit-button onClick={connectWallet} />
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

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-gray-700/50">
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full h-100 p-4 bg-gray-900/50 text-white rounded-lg resize-none focus:ring-2 focus:ring-emerald-500/50 focus:outline-none transition-all duration-300"
              placeholder="Enter your credentials here..."
            />

            <div className="flex items-center space-x-4 mt-4">
              <button
                onClick={handleStore}
                disabled={isStoring}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-3 rounded-lg text-white font-semibold 
                transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25
                hover:from-emerald-500 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save
                  className={`h-5 w-5 ${isStoring ? "animate-spin" : ""}`}
                />
                <span>{isStoring ? "Storing..." : "Store Securely"}</span>
              </button>

              <button
                onClick={navigateToRead}
                className="flex items-center space-x-2 bg-gray-700/50 px-6 py-3 rounded-lg text-white font-semibold 
                transition-all duration-300 hover:bg-gray-600/50 hover:shadow-lg"
              >
                <FileText className="h-5 w-5" />
                <span>View Stored Credentials</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
