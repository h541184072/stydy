// Input: [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
//              Not 7-1 = 6, as selling price needs to be larger than buying price.

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    const len = prices.length;
    let min = prices[0];
    let profit = 0;
    for (let i = 1; i < len; i++) {
        if (prices[i] - min > profit) profit = prices[i] - min;
        if (prices[i] < min) min = prices[i];
    }

    return profit;
};
