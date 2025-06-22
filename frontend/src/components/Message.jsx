import React, { useEffect, useRef } from 'react'
import {useSelector} from "react-redux";

const Message = ({message}) => {
    const scroll = useRef();
    const {authUser,selectedUser, otherUsers} = useSelector(store=>store.user);

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
    
    const renderContent = () => {
        if (message?.fileUrl) {
            if (message.fileType && message.fileType.startsWith('image/')) {
                return <img src={message.fileUrl} alt="sent-img" className="max-w-xs max-h-60 rounded-lg" />;
            } else if (message.fileType && message.fileType.startsWith('video/')) {
                return <video src={message.fileUrl} controls className="max-w-xs max-h-60 rounded-lg" />;
            }
        }
        if (message?.message) {
            return <span className="break-words text-base font-medium">{message.message}</span>;
        }
        return null;
    };

    // Fallback for missing or empty profilePhoto and gender
    const getProfilePhoto = (user) => {
        if (user?.profilePhoto && user.profilePhoto.trim() !== "") return user.profilePhoto;
        if (user?.gender === 'male') return "https://api.dicebear.com/7.x/adventurer/png?seed=default&backgroundColor=e0e7ff";
        if (user?.gender === 'female') return "https://api.dicebear.com/7.x/adventurer/png?seed=default&backgroundColor=e6e6fa";
        return "https://ui-avatars.com/api/?name=User&background=90cdf4&color=fff&rounded=true";
    }

    // Find the sender user object for this message
    const getSenderUser = () => {
        if (message?.senderId === authUser?._id) return authUser;
        if (selectedUser && message?.senderId === selectedUser?._id) return selectedUser;
        if (otherUsers && Array.isArray(otherUsers)) {
            return otherUsers.find(u => u._id === message?.senderId) || selectedUser;
        }
        return selectedUser;
    };

    // Format timestamp to IST
    const getISTTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true, day: '2-digit', month: 'short', year: 'numeric' });
    };

    const senderUser = getSenderUser();
    console.log('Message senderUser:', senderUser, 'ProfilePhoto:', getProfilePhoto(senderUser));

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header mb-1 flex items-center gap-2">
                {/* Removed profile photo from timestamp header */}
                <time className="text-sm font-semibold text-blue-700 bg-white bg-opacity-70 px-2 py-1 rounded shadow-sm">{getISTTime(message?.createdAt)}</time>
            </div>
            <div className="flex items-end gap-2">
                {message?.senderId !== authUser?._id && (
                    <img
                        src={getProfilePhoto(senderUser)}
                        alt="user-profile"
                        className="w-7 h-7 rounded-full border border-blue-200 bg-white object-cover"
                    />
                )}
                <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-blue-100 text-blue-900' : 'bg-blue-600 text-white'} px-4 py-2 text-base font-medium shadow-md`}>
                    {renderContent()}
                </div>
                {message?.senderId === authUser?._id && (
                    <img
                        src={getProfilePhoto(senderUser)}
                        alt="user-profile"
                        className="w-7 h-7 rounded-full border border-blue-200 bg-white object-cover"
                    />
                )}
            </div>
        </div>
    )
}

export default Message