import { CircleAlert, LucideSend } from "lucide-react";
import Image from "next/image";

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

const MessageInput = () => {
  return (
    <div>
      <form
        className="bg-bg-main absolute w-[calc(100%-32px)] rounded-md flex bottom-4 p-1 shadow-md shadow-primary/10 focus-within:outline-2 focus-within:outline-primary-300 max-lg:hidden"
        aria-label="Send a message"
      >
        <label htmlFor="message-input" className="sr-only">
          Message
        </label>
        <input
          type="text"
          className="flex-1 focus:outline-none px-1"
          placeholder={`Type a message...`}
          id="message-input"
          name="message-input"
        />
        <button type="submit" className="bg-primary rounded-md p-2">
          <LucideSend color="#fff5f0" size={19} />
        </button>
      </form>

      <form className="fixed bottom-0 left-0 w-full bg-bg-main py-4 px-2 z-10 gap-2 hidden max-lg:flex">
        <label htmlFor="message-input" className="sr-only">
          Message
        </label>
        <input
          type="text"
          className="flex-1 focus-within:outline-2 focus-within:outline-primary-300 px-1 rounded-md border border-primary-200 shadow-sm shadow-primary/10"
          placeholder={`Message to owner`}
          id="message-input"
          name="message-input"
        />
        <button type="submit" className="bg-primary rounded-md p-2 cursor-pointer">
          <LucideSend color="#fff5f0" size={19} />
        </button>
      </form>
    </div>
  );
};

const Chat = ({ booking }: { booking: Booking }) => {
  return (
    <section className="mt-[54px] flex-1 bg-primary-100 rounded-md py-4 pl-4 max-h-[648px] relative border border-primary-200 min-w-[42%]">
      <div
        className="h-[calc(100%-40px)] max-lg:h-[600px] overflow-y-scroll pb-20 [&::-webkit-scrollbar]:w-2 pr-4 [&::-webkit-scrollbar-track]:bg-[#fff5f0] [&::-webkit-scrollbar-thumb]:bg-[#9e9e9e] [&::-webkit-scrollbar-thumb]:rounded-full"
        role="log"
        aria-label="Chat message"
      >
        <SystemMessage message="Your request has been sent." />

        <MessageBubble
          variant="sent"
          msg="Hey, I would like enquire about the tablet."
          avatar={booking.renter.avatar}
        />

        <MessageBubble
          variant="received"
          msg="Letraset sheets containing Lorem Ipsum passages,"
          avatar={booking.owner.avatar}
        />

        <MessageBubble
          variant="sent"
          msg="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it "
          avatar={booking.renter.avatar}
        />
        <MessageBubble
          variant="received"
          msg="Letraset sheets containing Lorem Ipsum passages,"
          avatar={booking.owner.avatar}
        />
        <MessageBubble
          variant="received"
          msg="Letraset sheets containing Lorem Ipsum passages,"
          avatar={booking.owner.avatar}
        />

        <MessageBubble
          variant="sent"
          msg="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it "
          avatar={booking.renter.avatar}
        />
      </div>
      <MessageInput />
    </section>
  );
};

export default Chat;
