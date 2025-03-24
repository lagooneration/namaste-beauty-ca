import { type Metadata } from "next";
import { SliceComponentProps, SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Content } from "@prismicio/client";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("variation_one");
  const slices = bundleTextImageSlices(page.data.slices);

  return (
    <SliceZone
      slices={slices}
      components={{
        ...components,
        text_image_bundle: ({
          slice,
        }: SliceComponentProps<TextImageBundleSlice>) => (
          <div>
            <SliceZone slices={slice.slices} components={components} />
          </div>
        ),
      }}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("variation_one").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

type TextImageBundleSlice = {
  id: string;
  slice_type: "text_image_bundle";
  slices: Content.TextImageSlice[];
};

function bundleTextImageSlices(
  slices: Content.VariationOneDocumentDataSlicesSlice[]
) {
  const res: (
    | Content.VariationOneDocumentDataSlicesSlice
    | TextImageBundleSlice
  )[] = [];

  for (const slice of slices) {
    if (slice.slice_type !== "text_image") {
      res.push(slice);
      continue;
    }

    const bundle = res.at(-1);
    if (bundle?.slice_type === "text_image_bundle") {
      bundle.slices.push(slice);
    } else {
      res.push({
        id: `${slice.id}-bundle`,
        slice_type: "text_image_bundle",
        slices: [slice],
      });
    }
  }
  return res;
}