/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://AI-Content-Generator_owner:SXtre3CnG4Ja@ep-super-dawn-a5rkfwkw.us-east-2.aws.neon.tech/AI-Content-Generator?sslmode=require',
    }
  };
  