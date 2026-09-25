import GalleryContent from "../../components/GalleryContent";
import SchoolBoothLayout from "../../components/SchoolBoothLayout";

export default function GalleryPage() {
  return (
    <SchoolBoothLayout activePage="gallery">
      <GalleryContent />
    </SchoolBoothLayout>
  );
}
