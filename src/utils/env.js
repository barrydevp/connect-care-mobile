if (process.env.NODE_ENV === "production") {
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.production') });
} else {
  require('dotenv').config();
}