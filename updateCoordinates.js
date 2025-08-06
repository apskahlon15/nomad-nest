require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing"); // Adjust path as needed
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/nomad-nest",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected");
});

async function updateListingsWithCoordinates() {
  try {
    // Find listings that don't have geometry set or where it's empty
    const listings = await Listing.find({
      $or: [{ geometry: { $exists: false } }, { geometry: null }],
    });

    console.log(`Found ${listings.length} listings to update.`);

    for (const listing of listings) {
      if (!listing.location) {
        console.log(`Skipping listing ${listing._id} (no location)`);
        continue;
      }

      try {
        const response = await geocodingClient
          .forwardGeocode({
            query: listing.location,
            limit: 1,
          })
          .send();

        const feature = response.body.features[0];

        if (feature) {
          listing.geometry = {
            type: "Point",
            coordinates: feature.geometry.coordinates, // [lng, lat]
          };
          await listing.save();
          console.log(`Updated listing ${listing._id} with coordinates.`);
        } else {
          console.log(
            `No coordinates found for location: "${listing.location}"`
          );
        }
      } catch (err) {
        console.error(`Error geocoding listing ${listing._id}:`, err.message);
      }
    }

    console.log("Update process completed.");
  } catch (err) {
    console.error("Error fetching listings:", err);
  } finally {
    mongoose.connection.close();
  }
}

updateListingsWithCoordinates();
