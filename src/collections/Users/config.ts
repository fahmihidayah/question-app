import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'User Management',
    
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: "isSuperUser",
      type: "checkbox",
      defaultValue: false
    }
    // Email added by default
    // Add more fields as needed
  ],
}
