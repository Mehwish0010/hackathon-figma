import { defineType } from "sanity"

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            validation: (rule) => rule.required(),
            type: "string"
        },
        {
            name: "description",  // Fixed spelling (was "discription" in interface)
            type: "text",
            validation: (rule) => rule.required(),
            title: "Description",
        },
        {
            name: "productImage",
            type: "image",
            validation: (rule) => rule.required(),
            title: "Product Image"
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            validation: (Rule) => Rule.required(),
            options: {
                source: "title", // Generates slug from title automatically
                maxLength: 200,  // Prevents long URLs
                slugify: (input) => input
                    .toLowerCase()
                    .replace(/\s+/g, "-")  // Replace spaces with hyphens
                    .slice(0, 200)
            }
        }
        ,
        {
            name: "price",
            type: "number",
            validation: (rule) => rule.required(),
            title: "Price",
        },
        {
            name: "tags",
            type: "array",
            title: "Tags",
            of: [{ type: "string" }]
        },
        {
            name: "discountPercentage",  // Fixed spelling (was "dicountPercentage")
            type: "number",
            title: "Discount Percentage",
        },
        {
            name: "inventory",
            type: "number",
            title: "Inventory",
        },
        {
            name: "isNew",
            type: "boolean",
            title: "New Badge",
        }
    ]
})
