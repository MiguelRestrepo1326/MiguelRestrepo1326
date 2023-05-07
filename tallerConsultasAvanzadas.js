//1
// use('sample_airbnb');
// db.listingsAndReviews.aggregate([   {
//     $addFields: {
//       conteo: { $size: "$amenities" }        
//     }
//   },
//   {
//     $sort: { "conteo": -1 }
//   },
//   {
//     $limit: 1
//   },
//   {
//     $project: {
//       "_id": 0,
//       "name":1,
//       "amenities": 1
//     }
//   }
// ])

//2
// db.listingsAndReviews.aggregate([
//   {
//     $match: { amenities: { $in: ["Wifi", "Internet"] } }
//   },
//   {
//     $group: { "_id": 0, contador: { $sum: 1 } }
//   }
// ])


 
//3
// db.listingsAndReviews.aggregate([
//    {
//       $match: {
//          "address.country": "Brazil",
//          "review_scores.review_scores_rating": { $gte: 80 },
//          "amenities": { $in: ["Internet"] },
//          "number_of_reviews": { $gte: 50 }
//       }
//    },
//    {
//       $project: {
//          _id: 0,
//          name: 1,
//          address: 1,
//          review_scores: 1,
//          amenities: 1,
//          number_of_reviews: 1
//       }
//    }
// ]);



//4
// db.listingsAndReviews.aggregate([
//    {
//       $match: {
//          "room_type": "Entire home/apt"
//       }
//    },
//    {
//       $group: {
//          _id: "$address.country",
//          promedio: { $avg: "$price" }
//       }
//    },
//    {
//       $project: {
//          _id: 0,
//          country: "$_id",
//          promedio: 1
//       }
//    }
// ]);
