import Image from "next/image";

const ListingInfo = ({ listing }: { listing: Listing }) => {
  return (
    <div>
      <div>
        <div>
          <Image width={737} height={552} src={listing.pictures[0]} alt="" />
        </div>
        {listing.pictures.length > 0 && (
          <div className="flex">
            {listing.pictures.map((img) => (
              <Image key={img} width={80} height={72} src={img} alt="" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingInfo;
