import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    // DUAL CURRENCY FIELDS ADDED HERE
    defineField({
      name: 'priceUSD',
      title: 'Price (USD)',
      type: 'number',
      description: 'International retail price in US Dollars.',
    }),
    defineField({
      name: 'priceBDT',
      title: 'Price (BDT)',
      type: 'number',
      description: 'Domestic retail price in Bangladeshi Taka.',
    }),
    defineField({
      name: 'weight',
      title: 'Weight (kg)',
      type: 'number',
      description: 'Crucial for future weight-based bulk shipping calculations.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})