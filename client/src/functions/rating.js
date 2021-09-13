import React from 'react';
import StarRatings from 'react-star-ratings';

export const showAverage = (p) => {

    if (p && p.ratings) {
        let ratingsArray = p && p.ratings;
        let total = [];
        let length = ratingsArray.length;
        // console.log(length);

        ratingsArray.map((r) => total.push(r.star))
        let totalreduced = total.reduce((p, n) => p + n, 0) //initial value is 0 and reduce func add each val to nxt val in array
        //console.log(totalreduced);

        let highest = length * 5;
        //console.log(highest);

        let result = (totalreduced * 5) / highest;
        //console.log(result);

        return (
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRatings rating={result} />
                </span>
            </div>
        )
    }
}
