import getArt from "@/lib/getArt";
import ArtGallery from "@/components/ArtGallery";

export default async function MyComponent() {
  const arts = await getArt();
  console.log("MyComponent arts test")
  console.log(arts)

  return (
    <div>
      <ArtGallery arts={arts ?? []} />
    </div>
  );
}
