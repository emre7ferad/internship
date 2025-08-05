import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../axiosConfig";
import { API_ENDPOINTS } from "../utils/apiUtils";

interface Notification {
    id: string;
    title: string;
    content: string;
    read: boolean;
    date: Date;
}

export const useNotifications = () => {
    const { user, token } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (!user || !token) {
            setNotifications([]);
            return;
        }

        const fetchNotifications = async () => {
            try {
                const response = await api.get(API_ENDPOINTS.notifications.userNotifications(user.userId));
                setNotifications(response.data);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [user, token]);

    const handleMarkAsRead = async (notificationId: string) => {
        setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
        try {
            await api.patch(API_ENDPOINTS.notifications.markAsRead(notificationId));
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const handleDelete = async (notificationId: string) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId))
        try {
            await api.delete(API_ENDPOINTS.notifications.delete(notificationId));
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return { notifications, handleMarkAsRead, handleDelete, unreadCount };
}