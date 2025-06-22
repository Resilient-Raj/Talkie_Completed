import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector } from "react-redux";

const getProfilePhoto = (user) => {
    if (user?.profilePhoto && user.profilePhoto.trim() !== "") return user.profilePhoto;
    if (user?.gender === 'male') return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRyqpYMJ2Yu4I4z8dmvf8tLSq1mTPtzgJhHw&s";
    if (user?.gender === 'female') return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxl0XUFQmNCeQQNhTaEINArFtl0bIah44Lw&s";
    // generic fallback
    return "https://ui-avatars.com/api/?name=User&background=90cdf4&color=fff&rounded=true";
}

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);
   
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col rounded-xl shadow-xl border border-blue-200' style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 60%, #60a5fa 100%)' }}>
                        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2 rounded-t-xl'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full'>
                                    <img src={getProfilePhoto(selectedUser)} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center rounded-xl shadow-xl border border-blue-200' style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 60%, #60a5fa 100%)' }}>
                        <h1 className='text-4xl text-blue-800'>Hi, {authUser?.fullName} </h1>
                        <h1 className='text-2xl text-blue-800'>Let's start conversation</h1>

                    </div>
                )
            }
        </>

    )
}

export default MessageContainer