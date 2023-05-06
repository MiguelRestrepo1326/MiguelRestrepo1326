// use('sample_airbnb');
// db.listingsAndReviews.aggregate([
//     {
//         $addFields: {
//           conteo:{$size:"$amenities"}        
//         }
//     },
//     {
//         $match: {
//           "conteo":{$gte:{$size:"amenities"}}
//         }
//     },
//     {
//         $project: {"_id":-1,"name":1,"description":1}
//     },
//     {
//         $sort:{"conteo":1}
//     }
// ])


//1
// use('sample_airbnb');
// db.listingsAndReviews.aggregate([
//   {
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
//  db.listingsAndReviews.aggregate([
//      {
//        $match: {
//          "amenities": { $in: ["wifi", "internet"] }
//        }
//      }
//  ])

//3
// db.listingsAndReviews.aggregate([
//     {
//         $addFields: {
//             valoracion: {$avg:"$review_scores.review_scores_rating" },
//             comentarios:{$avg:"$reviews.comments"}
                   
//         }
//     },
//     {
//         $match:{$and:[{"comentarios":{$gte:50}},{"valoracion":{$gte:80}}, "amenites":{$in:["Ethernet"]},"address.country":"Brazil"]}
//     },
//     {
//         $sort: { "conteo": -1 }
//     },
//     {
//         $project: {
//             "_id": 0,
//             "name":1,
//             "amenities": 1
//             "address":1
//             "valoraciones":1
//             "comentarios":1
//         }
//     }
// ])

//4
// db.listingsAndReviews.aggregate([
//     {
//         $addFields: {
//             promedio:{$avg:"$price"}
                   
//         }
//     },
//     {
//         $match:{$in:[{"property_type":"House"}]}
//     },
//     {
//         $project: {
//             "_id": 0,
//              "name":1,
//              "address":1,
//              "promedio":1
//         }
        
//     }
    
// ])