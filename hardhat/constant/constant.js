require("dotenv").config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = [
  [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "noteId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "NoteEdited",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "noteId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "NoteStored",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_noteId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_newContent",
          type: "string",
        },
      ],
      name: "editNote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllNotes",
      outputs: [
        {
          internalType: "uint256[]",
          name: "noteIds",
          type: "uint256[]",
        },
        {
          internalType: "string[]",
          name: "contents",
          type: "string[]",
        },
        {
          internalType: "uint256[]",
          name: "timestamps",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getNoteCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_content",
          type: "string",
        },
      ],
      name: "storeNote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
];

export { CONTRACT_ADDRESS, CONTRACT_ABI };
