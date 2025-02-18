// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialsVault {
    //  Struct to store note details
    struct Note {
        string content;
        uint256 timestamp;
        bool exists;
    }
    
    // Mapping from address to array of note IDs
    mapping(address => uint256[]) private userNoteIds;
    // Mapping from note ID to Note struct
    mapping(uint256 => Note) private notes;
    // Counter for generating unique note IDs
    uint256 private noteIdCounter;
    
    // Events
    event NoteStored(address indexed user, uint256 indexed noteId, uint256 timestamp);
    event NoteEdited(address indexed user, uint256 indexed noteId, uint256 timestamp);
    
    /**
     * @dev Store a new note
     * @param _content The content of the note to store
     */
    function storeNote(string memory _content) external {
        require(bytes(_content).length > 0, "Content cannot be empty");
        
        // Generate new note ID
        uint256 noteId = noteIdCounter++;
        
        // Store the note
        notes[noteId] = Note({
            content: _content,
            timestamp: block.timestamp,
            exists: true
        });
        
        // Add note ID to user's array
        userNoteIds[msg.sender].push(noteId);
        
        emit NoteStored(msg.sender, noteId, block.timestamp);
    }
    
    /**
     * @dev Edit an existing note
     * @param _noteId The ID of the note to edit
     * @param _newContent The new content for the note
     */
    function editNote(uint256 _noteId, string memory _newContent) external {
        require(notes[_noteId].exists, "Note does not exist");
        require(bytes(_newContent).length > 0, "Content cannot be empty");
        
        // Verify ownership
        bool isOwner = false;
        uint256[] memory userNotes = userNoteIds[msg.sender];
        for (uint256 i = 0; i < userNotes.length; i++) {
            if (userNotes[i] == _noteId) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "Not authorized to edit this note");
        
        // Update the note
        notes[_noteId].content = _newContent;
        notes[_noteId].timestamp = block.timestamp;
        
        emit NoteEdited(msg.sender, _noteId, block.timestamp);
    }
    
    /**
     * @dev Get all notes for the calling user
     * @return noteIds Array of note IDs
     * @return contents Array of content strings
     * @return timestamps Array of timestamps
     */
    function getAllNotes() external view returns (
        uint256[] memory noteIds,
        string[] memory contents,
        uint256[] memory timestamps
    ) {
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
    
    /**
     * @dev Get the total number of notes for the calling user
     * @return The number of notes
     */
    function getNoteCount() external view returns (uint256) {
        return userNoteIds[msg.sender].length;
    }
}