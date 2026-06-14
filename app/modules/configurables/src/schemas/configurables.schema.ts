/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Tagline",
    },
    {
      fieldName: "heroHeadline",
      type: "string",
      required: false,
      label: "Hero Headline",
    },
    {
      fieldName: "heroSubheadline",
      type: "string",
      required: false,
      label: "Hero Subheadline",
    },
    {
      fieldName: "heroCTA",
      type: "string",
      required: false,
      label: "Hero CTA Button Label",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
    {
      fieldName: "pricingPaygPrice",
      type: "string",
      required: false,
      label: "Pay-as-you-go Price (e.g. $9)",
    },
    {
      fieldName: "pricingProPrice",
      type: "string",
      required: false,
      label: "Pro Plan Price (e.g. $79/month)",
    },
    {
      fieldName: "pricingPaygLabel",
      type: "string",
      required: false,
      label: "Pay-as-you-go Plan Label",
    },
    {
      fieldName: "pricingProLabel",
      type: "string",
      required: false,
      label: "Pro Plan Label",
    },
    {
      fieldName: "features",
      type: "array",
      label: "Feature Highlights",
      item: {
        type: "object",
        fields: [
          { fieldName: "title", type: "string", required: true, label: "Title" },
          { fieldName: "description", type: "string", required: true, label: "Description" },
          { fieldName: "icon", type: "string", required: false, label: "Icon name (lucide)" },
        ],
      },
    },
    {
      fieldName: "footerText",
      type: "string",
      required: false,
      label: "Footer Text",
    },
    {
      fieldName: "showTestimonials",
      type: "boolean",
      required: false,
      label: "Show Testimonials Section",
    },
    {
      fieldName: "showPricing",
      type: "boolean",
      required: false,
      label: "Show Pricing Section",
    },
  ],
};