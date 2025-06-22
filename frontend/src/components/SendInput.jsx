import React, {useState } from 'react'
import { IoSend } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import axios from "axios";
import {useDispatch,useSelector} from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.user);
    const {messages} = useSelector(store=>store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message && !file) return;
        try {
            const formData = new FormData();
            if (message) formData.append('message', message);
            if (file) formData.append('file', file);
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, formData, {
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            dispatch(setMessages([...messages, res?.data?.newMessage]))
        } catch (error) {
            console.log(error);
        } 
        setMessage("");
        setFile(null);
    }
    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative flex gap-3 items-center'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-300'
                />
                <label className='cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors duration-200 shadow-md'>
                    <FiPaperclip size={22} />
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={e => setFile(e.target.files[0])}
                        className='hidden'
                    />
                </label>
                <button type="submit" className='flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full p-2 transition-colors duration-200 shadow-md ml-2'>
                    <IoSend size={22} />
                </button>
            </div>
        </form>
    )
}

export default SendInput