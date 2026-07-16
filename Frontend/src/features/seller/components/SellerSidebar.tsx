import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaChartPie,
  FaClipboardList,
  FaCog,
  FaComments,
  FaHeadset,
  FaHeart,
  FaHome,
  FaPaw,
  FaPlusCircle,
  FaShoppingCart,
  FaStore,
  FaUser,
} from "react-icons/fa";

import { useAuth } from "@/features/Auth/hooks/authhook";
import { getMyConversationsApi } from "@/features/messages/api/message.api";
import type { Conversation } from "@/features/messages/types/message.types";
import Logo from "@/shared/components/Logo/Logo";

const links = [
  { label: "Home", icon: FaHome, path: "/" },
  { label: "Dashboard", icon: FaChartPie, path: "/seller/dashboard" },
  { label: "My Profile", icon: FaUser, path: "/pet-owner/profile" },
  { label: "My Pets", icon: FaPaw, path: "/pet-owner/my-pets" },
  { label: "Messages", icon: FaComments, path: "/messages" },
  {
    label: "Appointments",
    icon: FaCalendarAlt,
    path: "/pet-owner/appointments",
  },
  { label: "Marketplace", icon: FaStore, path: "/marketplace1" },
  { label: "My Listings", icon: FaClipboardList, path: "/seller/listings" },
  { label: "Add Listing", icon: FaPlusCircle, path: "/seller/add-product" },
  { label: "Orders", icon: FaShoppingCart, path: "/seller/orders" },
  { label: "Saved Listings", icon: FaHeart, path: "/seller/saved-listings" },
  { label: "Cart", icon: FaShoppingCart, path: "/cart" },
  { label: "Settings", icon: FaCog, path: "/seller/settings" },
];

const isConversationUnread = (
  conversation: Conversation,
  currentUserId?: string,
) => {
  if (!currentUserId || !conversation.lastMessage) return false;

  const lastMessage = conversation.lastMessage;

  if (lastMessage.senderId === currentUserId) return false;

  const currentParticipant = conversation.participants.find(
    (participant) => participant.userId === currentUserId,
  );

  if (!currentParticipant?.lastReadAt) return true;

  return (
    new Date(lastMessage.createdAt).getTime() >
    new Date(currentParticipant.lastReadAt).getTime()
  );
};

const SellerSidebar = () => {
  const { user } = useAuth();
  const currentUserId = user?.data?.id;

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const unreadChatsCount = useMemo(() => {
    return conversations.filter((conversation) =>
      isConversationUnread(conversation, currentUserId),
    ).length;
  }, [conversations, currentUserId]);

  useEffect(() => {
    if (!currentUserId) {
      setConversations([]);
      return;
    }

    let isMounted = true;

    const fetchUnreadMessages = async () => {
      try {
        const data = await getMyConversationsApi();

        if (isMounted) {
          setConversations(data);
        }
      } catch (error) {
        console.error("Failed to fetch unread messages count:", error);
      }
    };

    void fetchUnreadMessages();

    const intervalId = window.setInterval(fetchUnreadMessages, 20000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [currentUserId]);

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col overflow-hidden border-r border-gray-100 bg-white px-5 py-6">
      <div className="shrink-0 pb-6">
        <div className="min-w-0 [&_button]:max-w-full [&_button]:justify-start [&_h1]:text-xl [&_h1]:text-[#178f95] [&_p]:text-xs [&_p]:text-gray-400">
          <Logo />
        </div>
      </div>

      <nav
        className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:#178f95_#eef7f7] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#178f95]/60 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#eef7f7]"
        data-lenis-prevent
      >
        {links.map(({ label, icon: Icon, path }) => {
          const isMessagesLink = label === "Messages";
          const showUnreadBadge = isMessagesLink && unreadChatsCount > 0;

          return (
            <NavLink
              key={label}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive
                  ? "bg-[#e8f7f7] text-[#178f95]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#178f95]"
                }`
              }
            >
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <Icon className="text-sm" />

                {showUnreadBadge && (
                  <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </span>

              <span className="min-w-0 flex-1 truncate">{label}</span>

              {showUnreadBadge && (
                <span className="ml-auto inline-flex min-w-[22px] items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">
                  {unreadChatsCount > 99 ? "99+" : unreadChatsCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <NavLink
        to="/contact"
        className="mt-5 shrink-0 rounded-2xl bg-[#178f95] p-4 text-white shadow-sm transition hover:bg-[#12757a] hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <FaHeadset />
          </span>

          <div className="min-w-0">
            <p className="text-sm font-bold">Need Help?</p>
            <p className="mt-1 text-xs opacity-90">Contact Support</p>
          </div>
        </div>
      </NavLink>
    </aside>
  );
};

export default SellerSidebar;