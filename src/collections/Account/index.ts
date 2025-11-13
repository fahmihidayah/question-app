import { CollectionConfig } from "payload";
import { withAccountCollection } from 'payload-auth-plugin/collection'


export const Accounts: CollectionConfig = withAccountCollection(
  {
    slug: "accounts",
    admin : {
      group : "User Management"
    }
  },

  'users'
);