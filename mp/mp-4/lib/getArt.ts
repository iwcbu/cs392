"use server";

import { RawArt, ArtProps } from "@/types"; //TA-NOTE: imported the new type I made

const ART_API_KEY = process.env.API_KEY

export default async function getArt(): Promise<ArtProps[] | undefined | null> {
    try {

        const res = await fetch(
            `https://api.harvardartmuseums.org/object?size=100&hasimage=1&apikey=${ART_API_KEY}`
        );
        //TA-NOTE: I added the hasimage=1 to filter out records without images

        if (res.status === 429) { console.log("res.status === 429"); return null; }
        if (res.status !== 200) { console.log("res.status !==200"); return undefined; }

        const jsonRes = await res.json();

        if (!jsonRes.records || jsonRes.records.length === 0) {
            console.log("no records found.");
            return null;
        }

        //TA-NOTE: used the type RawArt which has a primaryimageurl field to filter out records with no pictures
        const filteredrecords: RawArt[] = jsonRes.records.filter(
            (r: RawArt) => Boolean(r.primaryimageurl)
        );

        if (filteredrecords.length === 0) {
            console.log("no record with image");
            return null;
        }

        const uniqueRecordsMap = new Map<number, RawArt>();
        for (const art of filteredrecords) {
            if (!uniqueRecordsMap.has(art.objectid)) {
                uniqueRecordsMap.set(art.objectid, art);
            }
        }
        // TA-NOTE: originally, removing duplicates was done using description as the key
        // This caused MANY records to collapse into one because multiple artworks 
        // have the same description (or no description at all, which became "no-description").
        // That is why only 1 record was showing up.
        // Using objectid instead ensures that each unique artwork remains in the list

        const uniqueRecords = Array.from(uniqueRecordsMap.values());

        const result: ArtProps[] =
            uniqueRecords.map((art) => (
                {
                    id: art.objectid,
                    image: art.primaryimageurl ?? "", // TA-NOTE: if no image, use empty string
                    title: art.title?.trim() || "Unknown", // TA-NOTE: if no title, use "Unknown"
                    description: art.description?.trim() || "Unknown" // TA-NOTE: if no description, use "Unknown"
                }
            ));

        return result

    } catch (error) {
        console.log("error occurred:", error);
        return undefined;
    }
}
