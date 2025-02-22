// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract CredentialsVault {
    struct Note {
        string content;
        uint256 timestamp;
        bool exists;
    }
    
    mapping(address => uint256[]) private userNoteIds;
    mapping(uint256 => Note) private notes;
    uint256 private noteIdCounter;
    event NoteStored(address indexed user, uint256 indexed noteId, uint256 timestamp);
    event NoteEdited(address indexed user, uint256 indexed noteId, uint256 timestamp);

    function storeNote(string memory _content) external {
        require(bytes(_content).length > 0, "Content cannot be empty");       
        uint256 noteId = noteIdCounter++;       
        notes[noteId] = Note({
            content: _content,
            timestamp: block.timestamp,
            exists: true
        });
        
        userNoteIds[msg.sender].push(noteId);
        emit NoteStored(msg.sender, noteId, block.timestamp);
    }
    
    function editNote(uint256 _noteId, string memory _newContent) external {
        require(notes[_noteId].exists, "Note does not exist");
        require(bytes(_newContent).length > 0, "Content cannot be empty");
        bool isOwner = false;
        uint256[] memory userNotes = userNoteIds[msg.sender];
        for (uint256 i = 0; i < userNotes.length; i++) {
            if (userNotes[i] == _noteId) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "Not authorized to edit this note");        
        notes[_noteId].content = _newContent;
        notes[_noteId].timestamp = block.timestamp;       
        emit NoteEdited(msg.sender, _noteId, block.timestamp);
    }

    function getAllNotes() external view returns (
        uint256[] memory noteIds,
        string[] memory contents,
        uint256[] memory timestamps
    ) 
    {
        noteIds = userNoteIds[msg.sender];
        contents = new string[](noteIds.length);
        timestamps = new uint256[](noteIds.length);        
        for (uint256 i = 0; i < noteIds.length; i++) {
            Note memory note = notes[noteIds[i]];
            if (note.exists) {
                contents[i] = note.content;
                timestamps[i] = note.timestamp;
            }
        }
        return (noteIds, contents, timestamps);
    }

    function getNoteCount() external view returns (uint256) {
        return userNoteIds[msg.sender].length;
    }
}