import React from "react";

const GetBookingStatusStatusMessage = ({
  config,
}: {
  config: GetBookingStatusMessageProps;
}) => {
  const { renter, owner, status, listing, role } = config;
  if (!renter || !owner || !status || !listing) return <></>;

  const r = <span className="text-primary">{renter}</span>;
  const o = <span className="text-primary">{owner}</span>;
  const l = <span className="text-primary">{listing}</span>;

  const BOOKING_STATUS_MESSAGES = {
    pending: {
      owner: (
        <>
          {r} has requested to rent your {l}.
        </>
      ),
      renter: (
        <>
          You&apos;ve requested to rent {l} from {o}.
        </>
      ),
    },
    accepted: {
      owner: (
        <>
          You have accepted {r}&apos;s request to rent your {l}.
        </>
      ),
      renter: (
        <>
          Your request to rent {l} has been accepted by {o}.
        </>
      ),
    },
    active: {
      owner: <>Your rental {l} is active.</>,
      renter: <>Your booking {l} is active.</>,
    },
    returned: {
      owner: (
        <>
          Your {l} has been returned to you by {r}.
        </>
      ),
      renter: (
        <>
          You have returned {l} to {o}.
        </>
      ),
    },
    cancelled: {
      owner: (
        <>
          {r} cancelled their request to rent {l}.
        </>
      ),
      renter: <>You cancelled your request to rent {l}.</>,
    },
    declined: {
      owner: (
        <>
          You declined {r}&apos;s request to rent {l}.
        </>
      ),
      renter: <>Your request to rent {l} has been declined.</>,
    },
  };
  return BOOKING_STATUS_MESSAGES[status][role];
};

export default GetBookingStatusStatusMessage;
