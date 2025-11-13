import { CollectionConfig } from "payload";

const Questions: CollectionConfig = {
  slug: 'questions',
  trash : true,
  admin: {
    useAsTitle: 'question',
    group: 'Conferences',
  },

  access: {
    read: ({ req }) => !!req.user, // hanya moderator (login) yang bisa lihat
    create: () => true, // publik bisa kirim pertanyaan
    delete: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'question',
      type: 'textarea',
      required: true,
    },
    {
      name : 'hideName',
      type : "checkbox",
      defaultValue : false,
    },
    {
      name : "accept",
      type : "checkbox",
      defaultValue : false,
    },
    {
      name: 'conference',
      type: 'relationship',
      relationTo: 'conferences',
      required: true,
    },
    {
      name : "user",
      type : "relationship",
      relationTo : "users",
      required : true,
      hasMany : false
    }
  ],
};

export default Questions;
