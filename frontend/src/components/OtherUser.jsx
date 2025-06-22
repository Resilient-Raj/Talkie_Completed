import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id);
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }
    // Fallback for missing or empty profilePhoto and gender
    const getProfilePhoto = () => {
        if (user?.profilePhoto && user.profilePhoto.trim() !== "") return user.profilePhoto;
        if (user?.gender === 'male') return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRyqpYMJ2Yu4I4z8dmvf8tLSq1mTPtzgJhHw&s";
        if (user?.gender === 'female') return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxl0XUFQmNCeQQNhTaEINArFtl0bIah44Lw&s";
        // generic fallback
        return "https://ui-avatars.com/api/?name=User&background=90cdf4&color=fff&rounded=true";
    }
    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
                <div className={`avatar ${isOnline ? 'online' : '' }`}>
                    <div className='w-12 rounded-full'>
                        <img src={getProfilePhoto()} alt="user-profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 text-black '>
                        <p>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    )
}

export default OtherUser