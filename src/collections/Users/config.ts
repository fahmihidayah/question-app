import type { CollectionConfig } from 'payload'

import { withUsersCollection } from "payload-auth-plugin/collection"
export const Users: CollectionConfig = withUsersCollection({
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'User Management',
    
  },
  auth: {
    // 1 week expiration
    tokenExpiration: 7 * 24 * 60 * 60, // in seconds
  },
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
)