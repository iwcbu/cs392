"use server";

import { ArtProps } from "@/types";

const ART_API_KEY = process.env.API_KEY

export default async function getArt(): Promise<ArtProps[] | undefined | null> {
    try {

        const res = await fetch(
            `https://api.harvardartmuseums.org/object?size=100&apikey=${ART_API_KEY}`

        );

        if (res.status === 429) { console.log("res.status === 429"); return null; }
        if (res.status !== 200) { console.log("res.status !==200"); return undefined; }

        const jsonRes = await res.json();
        
        if (!jsonRes.records || jsonRes.records.length === 0) {
        console.log("no records found.");
        return null;
        }


        const filteredrecords = jsonRes.records.filter((r: unknown) =>
        r.primaryimageurl
        );

        if (filteredrecords.length === 0) {
            console.log("no record with image, title, and description.");
            return null;
        }
        
        if (!filteredrecords) { return null; }

        const uniqueRecordsMap = new Map<number, any>();

        for (const art of filteredrecords) {
            const key = art.description;
            if (!uniqueRecordsMap.has(key)) {
                uniqueRecordsMap.set(key, art);
            }
        }

        const uniqueRecords = Array.from(uniqueRecordsMap.values());

        const result: ArtProps[] =
            uniqueRecords.map((art: unknown) => (
                {
                    id:art.objectid,
                    image: art.primaryimageurl,
                    title: !art.title || art.title.trim() == "" ? "Unknown" : art.title,
                    description: !art.description || art.description.trim() == ""  ? "Unknown" : art.description  
                }
            ));

        return result

    } catch (error) {
        console.log("error occurred:", error);
        return undefined;
    }
}
