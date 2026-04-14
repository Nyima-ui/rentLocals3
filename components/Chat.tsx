"use client";
import { CircleAlert, LucideSend } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthProvider";

const SystemMessage = ({ message }: { message: string }) => {
  return (
    <div className="bg-primary/30 rounded-md p-1.5 grow-0 mx-auto w-fit border-primary-400 border">
      <p className="flex items-center gap-2 text-sm">
        <CircleAlert size={18} color="#2c1815" strokeWidth={1.5} />
        <span>{message}</span>
      </p>
    </div>
  );
};

const MessageBubble = ({ variant, msg, avatar }: MessageBubbleProps) => {
  if (variant === "sent") {
    return (
      <div className="flex gap-2 justify-end mt-7">
        <span className="mt-4 px-3 py-2 bg-primary-200 text-sm rounded-l-md rounded-br-md max-w-[304px]">
          {msg}
        </span>
        <Image
          width={32}
          height={32}
          src={avatar}
          alt={msg}
          className="rounded-full self-start"
        />
      </div>
    );
  } else {
    return (
      <div className="flex gap-2 justify-start mt-7">
        <Image
          width={32}
          height={32}
          src={avatar}
          alt={msg}
          className="rounded-full self-start"
        />
        <p className="mt-4 px-3 py-2 bg-primary-200 text-sm rounded-r-md rounded-bl-md max-w-[304px]">
          {msg}
        </p>
      </div>
    );
  }
};

const MessageInput = ({
  booking,
  messageTo,
}: {
  booking: Booking;
  messageTo: string;
}) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    if (!message || !user) return;

    const receiverId =
      user.id === booking.renter_id ? booking.owner_id : booking.renter_id;

    const messagePayload: MessagePayload = {
      booking_id: booking.id,
      sender_id: user.id,
      receiver_id: receiverId,
      listing_id: booking.listing_id,
      message,
      type: "message",
    };
    console.log("user id", user.id)
    console.log(messagePayload)
    try {
      const { error } = await supabase.from("chat").insert(messagePayload);
      if (error) throw error;
      setMessage("");
    } catch (error) {
      console.error(`Error sending message ${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form
        className="bg-bg-main absolute w-[calc(100%-32px)] rounded-md flex bottom-4 p-1 shadow-md shadow-primary/10 focus-within:outline-2 focus-within:outline-primary-300 max-lg:hidden"
        aria-label="Send a message"
        onSubmit={handleSubmit}
      >
        <label htmlFor="message-input" className="sr-only">
          Message
        </label>
        <input
          type="text"
          className="flex-1 focus:outline-none px-1"
          placeholder={`Message to ${messageTo}`}
          id="message-input"
          name="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className={cn(
            `bg-primary rounded-md p-2 size-[35px] flex items-center justify-center`,
            loading && "cursor-not-allowed opacity-80",
          )}
        >
          {loading ? (
            <span className="size-3 border-3 border-primary-200 border-b-transparent rounded-full inline-block animate-spin"></span>
          ) : (
            <LucideSend color="#fff5f0" size={19} />
          )}
        </button>
      </form>

      <form
        className="fixed bottom-0 left-0 w-full bg-bg-main py-4 z-10 gap-2 hidden max-lg:flex 
      px-20 max-lg:px-10 max-sm:px-5"
        onSubmit={handleSubmit}
      >
        <label htmlFor="message-input" className="sr-only">
          Message
        </label>
        <input
          type="text"
          className="flex-1 focus-within:outline-2 focus-within:outline-primary-300 px-1 rounded-md border border-primary-200 shadow-sm shadow-primary/10"
          placeholder={`Message to ${messageTo}`}
          id="message-input"
          name="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className={cn(
            `bg-primary rounded-md p-2 size-[35px] flex items-center justify-center`,
            loading && "cursor-not-allowed opacity-80",
          )}
        >
          {loading ? (
            <span className="size-3 border-3 border-primary-200 border-b-transparent rounded-full inline-block animate-spin"></span>
          ) : (
            <LucideSend color="#fff5f0" size={19} />
          )}
        </button>
      </form>
    </div>
  );
};

const Chat = ({
  booking,
  classname,
  messageTo,
}: {
  booking: Booking;
  messageTo: string;
  classname?: string;
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("chat")
      .select("*")
      .eq("booking_id", booking.id)
      .order("created_at", { ascending: true })
      .then(({ data }) => setMessages(data ?? []));

    const channel = supabase
      .channel(`chat:${booking.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat",
          filter: `booking_id=eq.${booking.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as ChatMessage]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [booking.id]);

  console.log(messages);
  return (
    <section
      className={cn(
        `mt-[54px] max-lg:mt-8 flex-1 bg-primary-100 rounded-md py-4 pl-4 h-[648px] relative border border-primary-200 min-w-[42%] `,
        classname,
      )}
    >
      <div
        className="h-[calc(100%-40px)] max-lg:h-[600px] overflow-y-scroll pb-20 [&::-webkit-scrollbar]:w-2 pr-4 [&::-webkit-scrollbar-track]:bg-[#fff5f0] [&::-webkit-scrollbar-thumb]:bg-[#9e9e9e] [&::-webkit-scrollbar-thumb]:rounded-full "
        role="log"
        aria-label="Chat message"
      >
        {messages.map((msg) =>
          msg.type === "system" ? (
            <SystemMessage key={msg.id} message={msg.message} />
          ) : (
            <MessageBubble
              key={msg.id}
              variant={
                msg.sender_id === booking.renter_id ? "sent" : "received"
              }
              avatar={
                msg.sender_id === booking.renter_id
                  ? booking.renter.avatar
                  : booking.owner.avatar
              }
              msg={msg.message}
            />
          ),
        )}
      </div>
      <MessageInput booking={booking} messageTo={messageTo} />
    </section>
  );
};

export default Chat;
