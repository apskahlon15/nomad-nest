db.listings.updateMany({ url: { $exists: true } }, [
  {
    $set: {
      "image.url": "$url",
    },
  },
  {
    $unset: "url",
  },
]);
