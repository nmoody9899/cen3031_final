import React from "react";
import StarRating from "react-star-ratings";

//make sure you pass product to this function
export const showAverageRating = (p) => {
  if (p && p.ratings) {
    //
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    // console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));

    let totalReduced = total.reduce((p, n) => p + n, 0);
    //console.log("totalReduced", totalReduced);

    let highest = length * 5; //5 star rating highest possible value
    //console.log("highest", highest);

    let result = (totalReduced * 5) / highest; //this is the actual average number of stars for the product
    //console.log("result", result);

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            rating={result}
            starDimension="20px"
            starSpacing="2px"
            //numberOfStars={5}
            editing={false}
            starRatedColor="#b03a1e"
          />{" "}
          ({length})
        </span>
      </div>
    );
  }
};
