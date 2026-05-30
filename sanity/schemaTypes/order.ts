export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    { 
      name: 'orderNumber', 
      title: 'Order Number', 
      type: 'string',
      readOnly: true, // Generated automatically by our backend
    },
    { name: 'customerName', title: 'Customer Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'address', title: 'Shipping Address', type: 'text' },
    {
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'product', title: 'Product', type: 'reference', to: [{ type: 'product' }] },
            { name: 'quantity', title: 'Quantity', type: 'number' },
            { name: 'price', title: 'Price at Purchase', type: 'number' }
          ],
          preview: {
            select: {
              title: 'product.title',
              subtitle: 'quantity'
            },
            prepare(selection: any) {
              const { title, subtitle } = selection;
              return {
                title: title || 'Unknown Product',
                subtitle: `Qty: ${subtitle}`
              }
            }
          }
        }
      ]
    },
    { name: 'totalPrice', title: 'Total Price', type: 'number' },
    { name: 'currency', title: 'Currency', type: 'string' },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' }
        ],
        layout: 'radio'
      },
      initialValue: 'pending'
    },
    { name: 'createdAt', title: 'Created At', type: 'datetime' }
  ]
}