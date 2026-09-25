"use client";

import Image, { type StaticImageData } from "next/image";
import { useMemo, useState } from "react";

import schoolLifeImage from "../public/gallery/school-life.png";

interface Photo {
  id: number;
  title: string;
  date: string;
  template: "Classic" | "Best Friends" | "School Life";
  image: StaticImageData;
  imageClass: string;
}

const mockPhotos: Photo[] = [
  {
    id: 1,
    title: "Good Vibes",
    date: "Sep 23, 2026 10:15 AM",
    template: "Classic",
    image: schoolLifeImage,
    imageClass: "",
  },
  {
    id: 2,
    title: "Best Friends",
    date: "Sep 23, 2026 09:42 AM",
    template: "Best Friends",
    image: schoolLifeImage,
    imageClass: "hue-rotate-[330deg]",
  },
  {
    id: 3,
    title: "School Life",
    date: "Sep 22, 2026 04:18 PM",
    template: "School Life",
    image: schoolLifeImage,
    imageClass: "hue-rotate-[20deg]",
  },
  {
    id: 4,
    title: "Good Memories",
    date: "Sep 22, 2026 11:03 AM",
    template: "Classic",
    image: schoolLifeImage,
    imageClass: "brightness-90 saturate-75",
  },
  {
    id: 5,
    title: "Capture Good Vibes",
    date: "Sep 21, 2026 05:26 PM",
    template: "Classic",
    image: schoolLifeImage,
    imageClass: "sepia-[.15]",
  },
  {
    id: 6,
    title: "Friends Forever",
    date: "Sep 21, 2026 03:11 PM",
    template: "Best Friends",
    image: schoolLifeImage,
    imageClass: "hue-rotate-[300deg] saturate-125",
  },
  {
    id: 7,
    title: "School Memories",
    date: "Sep 20, 2026 02:47 PM",
    template: "School Life",
    image: schoolLifeImage,
    imageClass: "hue-rotate-[45deg] saturate-90",
  },
  {
    id: 8,
    title: "Make It Special",
    date: "Sep 20, 2026 12:01 PM",
    template: "Classic",
    image: schoolLifeImage,
    imageClass: "brightness-75 saturate-75",
  },
];

export default function GalleryContent() {
  const [photos, setPhotos] = useState(mockPhotos);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [template, setTemplate] = useState("All Photos");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const visiblePhotos = useMemo(() => {
    const query = search.trim().toLowerCase();
    return photos.filter(
      (photo) =>
        (photo.title.toLowerCase().includes(query) ||
          photo.template.toLowerCase().includes(query)) &&
        (template === "All Photos" || photo.template === template),
    );
  }, [photos, search, template]);

  const selectedPhoto =
    photos.find((photo) => photo.id === selectedId) ?? visiblePhotos[0] ?? null;

  function togglePhotoSelection(photoId: number) {
    setSelectedIds((currentIds) =>
      currentIds.includes(photoId)
        ? currentIds.filter((id) => id !== photoId)
        : [...currentIds, photoId],
    );
  }

  function deletePhotos(photoIds: number[]) {
    const remainingPhotos = photos.filter(
      (photo) => !photoIds.includes(photo.id),
    );
    setPhotos(remainingPhotos);
    setSelectedIds((currentIds) =>
      currentIds.filter((id) => !photoIds.includes(id)),
    );
    if (photoIds.includes(selectedId))
      setSelectedId(remainingPhotos[0]?.id ?? 0);
  }

  return (
    <section className="mx-auto grid w-full max-w-[1600px] flex-1 gap-8 px-6 py-6 sm:px-10 lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_27rem] lg:px-12 lg:py-5">
      <div className="min-w-0 lg:flex lg:min-h-0 lg:flex-col">
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <h1 className="text-3xl font-black tracking-[-0.05em] sm:text-4xl">
              ▣ Gallery
            </h1>
            <p className="mt-1 text-lg font-medium text-[#5c70a4]">
              View, download, or delete your photos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="flex min-w-48 flex-1 items-center gap-2 rounded-xl border border-[#dbeaff] bg-white px-4 py-3 text-[#6275a4] xl:flex-none">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent outline-none"
                placeholder="Search photos..."
              />
            </label>
            <select
              value={template}
              onChange={(event) => setTemplate(event.target.value)}
              className="rounded-xl border border-[#dbeaff] bg-white px-4 py-3 font-medium text-[#536797] outline-none"
            >
              <option>All Photos</option>
              <option>Classic</option>
              <option>Best Friends</option>
              <option>School Life</option>
            </select>
            <button
              type="button"
              onClick={() => {
                setSelectMode(!selectMode);
                setSelectedIds([]);
              }}
              className={`rounded-xl border px-4 py-3 font-bold ${selectMode ? "border-[#1261eb] bg-[#1261eb] text-white" : "border-[#c8e0ff] bg-[#eef7ff] text-[#09245a]"}`}
            >
              ☑ Select
            </button>
          </div>
        </div>
        {selectMode && selectedIds.length > 0 && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#fff0f4] px-4 py-3 text-[#a2264a]">
            <span>
              {selectedIds.length} photo{selectedIds.length > 1 ? "s" : ""}{" "}
              selected
            </span>
            <button
              type="button"
              onClick={() => deletePhotos(selectedIds)}
              className="font-bold"
            >
              Delete selected
            </button>
          </div>
        )}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
          {visiblePhotos.map((photo) => {
            const isSelected = photo.id === selectedPhoto?.id;
            const isMarked = selectedIds.includes(photo.id);
            return (
              <article
                key={photo.id}
                className={`relative overflow-hidden rounded-xl border bg-white shadow-sm transition ${isSelected ? "border-[#1261eb] ring-2 ring-[#1261eb]/15" : "border-[#e2ecfb] hover:-translate-y-0.5 hover:shadow-md"}`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(photo.id)}
                  className="relative block aspect-[3/4] w-full overflow-hidden bg-[#e8f3ff] text-left"
                >
                  <Image
                    src={photo.image}
                    alt={`${photo.title} photobooth strip`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 20vw"
                    className={`object-cover ${photo.imageClass}`}
                  />
                </button>
                {selectMode && (
                  <button
                    type="button"
                    onClick={() => togglePhotoSelection(photo.id)}
                    aria-label={`Select ${photo.title}`}
                    className={`absolute right-3 top-3 flex size-7 items-center justify-center rounded-lg border-2 ${isMarked ? "border-[#1261eb] bg-[#1261eb] text-white" : "border-white bg-white/90 text-transparent"}`}
                  >
                    ✓
                  </button>
                )}
                <div className="flex items-center justify-between gap-2 px-3 py-3 text-sm text-[#50689e]">
                  <div>
                    <p className="font-bold text-[#09245a]">{photo.title}</p>
                    <p className="mt-1">{photo.date}</p>
                  </div>
                  <button
                    type="button"
                    aria-label={`More options for ${photo.title}`}
                    className="text-xl"
                  >
                    ⋮
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        {visiblePhotos.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[#bedcff] p-12 text-center text-[#6275a4]">
            No photos match your search.
          </div>
        )}
      </div>
      <aside className="rounded-2xl border border-[#e1ecfb] bg-[#f8fbff] p-5 shadow-sm lg:min-h-0 lg:overflow-y-auto">
        <h2 className="text-xl font-black">◉ Preview</h2>
        <p className="mt-1 text-[#5c70a4]">
          Here&apos;s a closer look at your photo.
        </p>
        {selectedPhoto ? (
          <>
            <div className="relative mx-auto mt-4 aspect-[3/4] max-w-sm overflow-hidden rounded-xl border-4 border-white bg-[#dcecff] shadow-lg">
              <Image
                src={selectedPhoto.image}
                alt={`${selectedPhoto.title} preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 432px"
                className={`object-cover ${selectedPhoto.imageClass}`}
              />
            </div>
            <dl className="mt-5 space-y-4 rounded-xl bg-white p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="font-bold">▣ Date Taken</dt>
                <dd className="text-right text-[#50689e]">
                  {selectedPhoto.date}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold">▧ Template</dt>
                <dd className="text-[#50689e]">{selectedPhoto.template}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-bold">ⓘ Size</dt>
                <dd className="text-[#50689e]">1080 × 1440 (PNG)</dd>
              </div>
            </dl>
            <a
              href="/gallery/school-life.png"
              download={`${selectedPhoto.title.toLowerCase().replaceAll(" ", "-")}.png`}
              className="mt-4 flex justify-center rounded-xl bg-[#1261eb] px-4 py-3 font-bold text-white transition hover:bg-[#0d54d3]"
            >
              ⇩ Download Image
            </a>
            <button
              type="button"
              onClick={() => deletePhotos([selectedPhoto.id])}
              className="mt-3 flex w-full justify-center rounded-xl border-2 border-[#ff8dac] px-4 py-3 font-bold text-[#f0275b] transition hover:bg-[#fff0f4]"
            >
              ♙ Delete
            </button>
          </>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-[#bedcff] p-8 text-center text-[#6275a4]">
            No photos left to preview.
          </div>
        )}
      </aside>
    </section>
  );
}
