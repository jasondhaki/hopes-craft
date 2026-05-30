import { type SchemaTypeDefinition } from 'sanity'
import category from './category'
import product from './product'
import story from './story'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, product, story, order],
}