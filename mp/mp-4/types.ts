//TA-NOTE: this is the type for the art object after cleaning
export type ArtProps = {
    id: number;
    title: string;
    image: string;
    description: string;
}

//TA-NOTE: I created this type for the raw data returned from the initial API call
export type RawArt = {
    objectid: number;
    primaryimageurl?: string;
    title?: string;
    description?: string;
}