import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Conversation = () => {
    const { id } = useParams();
    const [conversation, setConversation] = useState();
    const [newBoardTitle, setNewBoardTitle] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [selectedBoardId, setSelectedBoardId] = useState(null);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/conversations/${id}`, { withCredentials: true });
                setConversation(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchConversation();
    }, [id]);

    const handleAddBoard = async (e) => {
        e.preventDefault();
        if (newBoardTitle) {
            try {
                const res = await axios.post(`http://localhost:3000/conversations/${id}/boards`, { title: newBoardTitle }, { withCredentials: true });
                setConversation((prev) => ({ ...prev, boards: [...prev.boards, res.data] }));
                setNewBoardTitle('');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleAddTask = async (e, boardId) => {
        e.preventDefault();
        if (newTaskTitle && boardId) {
            try {
                const res = await axios.post(`http://localhost:3000/boards/${boardId}/tasks`, { title: newTaskTitle }, { withCredentials: true });
                setConversation((prev) => ({
                    ...prev,
                    boards: prev.boards.map((board) =>
                        board._id === boardId ? { ...board, tasks: [...board.tasks, res.data] } : board
                    ),
                }));
                setNewTaskTitle('');
            } catch (error) {
                console.log(error);
            }
        }
    };


    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return; // Drop outside the list

        const sourceBoard = conversation.boards.find(board => board._id === source.droppableId);
        const destBoard = conversation.boards.find(board => board._id === destination.droppableId);

        // Extract the task being moved
        const [movedTask] = sourceBoard.tasks.splice(source.index, 1);

        // Reorder in the frontend state
        if (sourceBoard !== destBoard) {
            destBoard.tasks.splice(destination.index, 0, movedTask);
        } else {
            sourceBoard.tasks.splice(destination.index, 0, movedTask);
        }

        setConversation({ ...conversation }); // Update local state
    };




    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='w-[70%] h-auto flex-col border shadow-md rounded-lg p-5'>
                <h1 className='text-2xl font-bold'>{conversation?.title}</h1>
                <p className='text-gray-600'>Access Code: {conversation?.access_code}</p>

                <form className='mt-5'>
                    <input
                        type='text'
                        placeholder='New board title'
                        value={newBoardTitle}
                        onChange={(e) => setNewBoardTitle(e.target.value)}
                        className='border p-2 rounded w-full mb-3'
                    />
                    <button type="submit" onClick={handleAddBoard} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                        Add Board
                    </button>
                </form>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className='w-full flex overflow-x-auto gap-3 mt-7'>
                        {conversation?.boards?.map((board) => (
                            <Droppable key={board._id} droppableId={board._id}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className='flex-shrink-0 border rounded-lg p-4 shadow-sm w-80'
                                    >
                                        <h2 className='text-xl font-semibold'>{board.title}</h2>
                                        <form className='flex mt-3 gap-3' onSubmit={(e) => handleAddTask(e, board._id)}>
                                            <input
                                                type='text'
                                                placeholder='New task title'
                                                value={newTaskTitle}
                                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                                className='border p-2 rounded w-full'
                                            />
                                            <button type="submit" className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
                                                Add Task
                                            </button>
                                        </form>
                                        <div className='flex flex-col gap-3 mt-3'>
                                            {board.tasks.map((task, index) => (
                                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className='border p-2 rounded bg-gray-100'
                                                        >
                                                            <p>{task.title}</p>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default Conversation;
