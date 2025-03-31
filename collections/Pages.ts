import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "sections",
      type: "blocks",
      required: true,
      blocks: [
        {
          slug: "hero",
          fields: [
            {
              name: "direction",
              type: "select",
              options: [
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
              ],
              defaultValue: "right",
              required: true,
            },
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "buttonTitle",
              type: "text",
              required: true,
            },
            {
              name: "imageSrc",
              type: "text",
              required: true,
            },
          ],
        },
        {
          slug: "textImage",
          fields: [
            {
              name: "direction",
              type: "select",
              options: [
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
              ],
              required: true,
            },
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              required: true,
            },
            {
              name: "buttonTitle",
              type: "text",
              required: true,
            },
            {
              name: "imageSrc",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
        {
          slug: "productSlider",
          fields: [],
        },
        {
          slug: "faq",
          fields: [
            {
              name: "direction",
              type: "select",
              options: [
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
              ],
              required: true,
            },
          ],
        },
        {
          slug: "reviewSlider",
          fields: [],
        },
        {
          slug: "baseText",
          fields: [
            {
              name: "alignment",
              type: "select",
              options: [
                { label: "Left", value: "text-left" },
                { label: "Right", value: "text-right" },
                { label: "Center", value: "text-center" },
              ],
              required: true,
            },
            {
              name: "subtitle",
              type: "text",
              required: true,
            },
            {
              name: "title",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
