import { type SchemaTypeDefinition } from 'sanity'
import category from './category'
import product from './product'
import story from './story'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, product, story],
}