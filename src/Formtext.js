import React, { useState } from 'react';
import './Formtext.css';
export default function FormText() {
    // State to hold the input text
    const [text, setText] = useState('');
    // Stack to hold the previous states of the text (undo stack)
    const [textHistory, setTextHistory] = useState([]);
    // Stack to hold the undone states of the text (redo stack)
    const [redoStack, setRedoStack] = useState([]);

    // Function to handle changes in the textarea
    const handleOnChange = event => {
        setText(event.target.value);
    };

    // Function to add the current text to the stack and then modify the text
    const performAction = (newText) => {
        // Push the current text onto the undo stack
        setTextHistory(prevHistory => [...prevHistory, text]);
        // Clear the redo stack when a new action is performed
        setRedoStack([]);
        // Set the new text
        setText(newText);
    };

    // Function to undo the last action
    const handleUndo = () => {
        // Ensure there is something on the undo stack to undo
        if (textHistory.length > 0) {
            // Pop the last item from the undo stack and set the state of the text to it
            const previousText = textHistory.pop();
            // Push the current text onto the redo stack
            setRedoStack(prevRedo => [...prevRedo, text]);
            // Update the state of the text to the previous text
            setText(previousText);
        } else {
            // If there is nothing to undo, alert the user
            alert("No actions to undo");
        }
    };

    // Function to redo the last undone action
    const handleRedo = () => {
        // Ensure there is something on the redo stack to redo
        if (redoStack.length > 0) {
            // Pop the last item from the redo stack and set the state of the text to it
            const futureText = redoStack.pop();
            // Push the current text onto the undo stack
            setTextHistory(prevHistory => [...prevHistory, text]);
            // Update the state of the text to the future text
            setText(futureText);
        } else {
            // If there is nothing to redo, alert the user
            alert("No actions to redo");
        }
    };

    // Function to replace a word in the text
    const handleReplaceWord = () => {
        // Ask the user for the word to replace using a prompt box
        const wordToReplace = window.prompt("Enter the word to replace:");
        if (wordToReplace === null) {
            // If the user cancels the prompt, exit the function
            return;
        }

        // Ask the user for the new word using another prompt box
        const newWord = window.prompt("Enter the new word:");
        if (newWord === null) {
            // If the user cancels the prompt, exit the function
            return;
        }

        // Replace all occurrences of the word to replace with the new word
        const newText = text.split(wordToReplace).join(newWord);
        performAction(newText);
    };

    // Function to reverse the text
    const handleReverseText = () => {
        const reversedText = text.split('').reverse().join('');
        performAction(reversedText);
    };

    // Function to convert the text to binary
    const handleConvertToBinary = () => {
        const binaryText = text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
        performAction(binaryText);
    };

    // Function to remove extra spaces
    const handleRemoveExtraSpaces = () => {
        const cleanedText = text.trim().replace(/\s+/g, ' ');
        performAction(cleanedText);
    };

    // Functions to convert text to uppercase or lowercase
    const handleUpClick = () => {
        performAction(text.toUpperCase());
    };

    const handleDownClick = () => {
        performAction(text.toLowerCase());
    };

    // Function to clear the text
    const handleClear = () => {
        performAction('');
    };

    // Functions for copy and paste
    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            alert("Text copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const handlePasteFromClipboard = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            performAction(clipboardText);
            alert("Text pasted from clipboard!");
        } catch (err) {
            console.error("Failed to paste text: ", err);
        }
    };

    return (
        <>
            <div className="container">
                <h1>Enter the text to analyze</h1>
                <form>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            value={text}
                            onChange={handleOnChange}
                            id="exampleFormControlTextarea1"
                            rows="8"
                        ></textarea>
                    </div>
                </form>
                <button
                    className="btn btn-primary mx-1 my-3"
                    onClick={handleUpClick}
                >
                    Convert to Uppercase
                </button>
                <button
                    className="btn btn-primary mx-1 my-3"
                    onClick={handleDownClick}
                >
                    Convert to Lowercase
                </button>
                <button
                    className="btn btn-primary mx-1 my-3"
                    onClick={handleClear}
                >
                    Clear
                </button>
                <button
                    className="btn btn-primary mx-1 my-3"
                    onClick={handleConvertToBinary}
                >
                    Convert to Binary Code
                </button>
                <button
                    className="btn btn-primary mx-1 my-3"
                    onClick={handleRemoveExtraSpaces}
                >
                    Remove Extra Spaces
                </button>
                <button
                    className="btn btn-primary mx-1 my-3"
                    onClick={handleCopyToClipboard}
                >
                    Copy to Clipboard
                </button>
                <button
                    className="btn btn-primary mx-1 my-3"
                    onClick={handlePasteFromClipboard}
                >
                    Paste from Clipboard
                </button>
                <button
                    className="btn btn-primary mx-1 my-3"
                    onClick={handleReverseText}
                >
                    Reverse Text
                </button>
                <button
                    className="btn btn-primary mx-1 my-3"
                    onClick={handleReplaceWord}
                >
                    Replace Word
                </button>
                {/* Button to undo the last action */}
                <button
                    className="btn btn-primary mx-1 my-3"
                    onClick={handleUndo}
                >
                    Undo Action
                </button>
                {/* Button to redo the last undone action */}
                <button
                    className="btn btn-primary mx-1 my-3"
                    onClick={handleRedo}
                >
                    Redo Action
                </button>
            </div>

            <div className="container">
                <h2>Analyzed Text</h2>
                <p>{text.trim().split(/\s+/).length} words and {text.length} characters</p>
            </div>
        </>
    );
}
