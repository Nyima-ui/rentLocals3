import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { fetchListing, getRandomUserId } from "./scraper";

export async function GET(request: NextRequest) {
  try {
    const secret = request.headers.get("x-cron-secret");
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const supabase = createAdminClient();

    const [{ id }, listing] = await Promise.all([
      getRandomUserId(),
      fetchListing(),
    ]);

    if (!listing) {
      return NextResponse.json(
        { message: "Failed to fetch listing from Hygglo" },
        { status: 502 },
      );
    }

    const { title, description, category, location, prices, pictures } =
      listing;

    const { error: listingError } = await supabase
      .from("listings")
      .insert({
        owner_id: id,
        title,
        description,
        category,
        location,
        pictures,
        price_day: prices.day,
        price_week: prices.week,
      })
      .select()
      .single();

    if (listingError) throw listingError;

    return NextResponse.json({ message: "Listing created successfully" });
  } catch (error) {
    console.error("Error creating scraped listing", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}