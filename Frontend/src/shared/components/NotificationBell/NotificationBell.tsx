import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCheck,
  Clock,
  MessageCircle,
  Package,
  ShoppingBag,
  Trash2,
  TriangleAlert,
} from "lucide-react";

import {
  getMyNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  deleteNotification,
} from "@/features/notifications/api/notification.api";
import {
  connectNotificationSocket,
  type NotificationNewPayload,
} from "@/features/notifications/socket/notification.socket";
import type {
  NotificationItem,
  NotificationType,
} from "@/features/notifications/types/notification.types";

const getNotificationIcon = (type: NotificationType) => {
  if (type === "MESSAGE") return MessageCircle;
  if (type === "ORDER") return ShoppingBag;
  if (type === "LOW_STOCK") return TriangleAlert;
  if (type === "APPOINTMENT") return Clock;
  if (type === "PAYMENT") return Package;

  return Bell;
};

const getNotificationTime = (createdAt: string) => {
  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();
  const diffInMinutes = Math.floor((now - createdTime) / 60000);

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) return `${diffInDays}d ago`;

  return new Date(createdAt).toLocaleDateString();
};

const NotificationBell = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const hasUnread = unreadCount > 0;

  const visibleUnreadCount = useMemo(() => {
    if (unreadCount > 99) return "99+";
    return unreadCount;
  }, [unreadCount]);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);

      const data = await getMyNotifications({
        page: 1,
        limit: 10,
      });

      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.log("Failed to load notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const data = await getUnreadNotificationCount();
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.log("Failed to load unread notifications:", error);
    }
  };

  useEffect(() => {
    void loadUnreadCount();

    const socket = connectNotificationSocket();

    const handleNewNotification = (payload: NotificationNewPayload) => {
      if (!payload?.notification) return;

      setNotifications((previousNotifications) => {
        const alreadyExists = previousNotifications.some(
          (notification) => notification.id === payload.notification.id,
        );

        if (alreadyExists) return previousNotifications;

        return [payload.notification, ...previousNotifications].slice(0, 10);
      });

      setUnreadCount((previousCount) => previousCount + 1);
    };

    const handleUnreadChanged = () => {
      void loadUnreadCount();
    };

    socket.on("notification:new", handleNewNotification);
    socket.on("notification:unread-changed", handleUnreadChanged);

    return () => {
      socket.off("notification:new", handleNewNotification);
      socket.off("notification:unread-changed", handleUnreadChanged);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      void loadNotifications();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationClick = async (notification: NotificationItem) => {
    try {
      if (!notification.isRead) {
        await markNotificationAsRead(notification.id);

        setNotifications((previousNotifications) =>
          previousNotifications.map((item) =>
            item.id === notification.id ? { ...item, isRead: true } : item,
          ),
        );

        setUnreadCount((previousCount) => Math.max(previousCount - 1, 0));
      }

      setIsOpen(false);

      if (notification.link) {
        navigate(notification.link);
      }
    } catch (error) {
      console.log("Failed to open notification:", error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      console.log("Failed to mark all notifications as read:", error);
    }
  };

  const handleDeleteNotification = async (
    event: React.MouseEvent<HTMLButtonElement>,
    notificationId: string,
  ) => {
    event.stopPropagation();

    try {
      await deleteNotification(notificationId);

      const deletedNotification = notifications.find(
        (notification) => notification.id === notificationId,
      );

      setNotifications((previousNotifications) =>
        previousNotifications.filter(
          (notification) => notification.id !== notificationId,
        ),
      );

      if (deletedNotification && !deletedNotification.isRead) {
        setUnreadCount((previousCount) => Math.max(previousCount - 1, 0));
      }
    } catch (error) {
      console.log("Failed to delete notification:", error);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((previousState) => !previousState)}
        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-600 shadow-sm transition hover:border-[#178f95]/30 hover:bg-[#eefafa] hover:text-[#178f95]"
        aria-label="Notifications"
        title="Notifications"
      >
        <Bell size={19} />

        {hasUnread && (
          <span className="absolute -right-1 -top-1 inline-flex min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-black leading-none text-white ring-2 ring-white">
            {visibleUnreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[52px] z-[70] w-[380px] overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h3 className="text-base font-black text-[#07182c]">
                Notifications
              </h3>

              <p className="mt-0.5 text-xs font-semibold text-slate-500">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""
                  }`
                  : "No unread notifications"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#eefafa] px-3 py-2 text-xs font-black text-[#178f95] transition hover:bg-[#178f95] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCheck size={14} />
              Read all
            </button>
          </div>

          <div className="max-h-[410px] overflow-y-auto p-3" data-lenis-prevent>
            {isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-slate-50 p-4"
                  >
                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                    <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-200" />
                    <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            )}

            {!isLoading && notifications.length === 0 && (
              <div className="px-5 py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eefafa] text-[#178f95]">
                  <Bell size={24} />
                </div>

                <h4 className="mt-4 text-sm font-black text-[#07182c]">
                  No notifications yet
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  New messages, orders, and low-stock alerts will show here.
                </p>
              </div>
            )}

            {!isLoading &&
              notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);

                return (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => void handleNotificationClick(notification)}
                    className={`group mb-2 flex w-full gap-3 rounded-2xl p-3 text-left transition hover:bg-[#f5fbff] ${notification.isRead ? "bg-white" : "bg-[#eefafa]"
                      }`}
                  >
                    <div
                      className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${notification.isRead
                          ? "bg-slate-100 text-slate-500"
                          : "bg-[#178f95] text-white"
                        }`}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="line-clamp-1 text-sm font-black text-[#07182c]">
                          {notification.title}
                        </h4>

                        {!notification.isRead && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                        )}
                      </div>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">
                        {notification.message}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-400">
                          {getNotificationTime(notification.createdAt)}
                        </span>

                        <button
                          type="button"
                          onClick={(event) =>
                            void handleDeleteNotification(
                              event,
                              notification.id,
                            )
                          }
                          className="rounded-full p-1.5 text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                          aria-label="Delete notification"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;