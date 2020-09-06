// Input: [7,1,5,3,6,4]
// Output: 7
// Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
//              Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.


// 自己写的
var maxProfit = function(prices) {
    if (prices.length === 0) return 0;
    let profit = 0;
    let min = prices[0];
    let max = prices[0];
    for (let i = 1, len = prices.length; i < len; i++) {
        if (prices[i] > prices[i - 1]) {
            max = prices[i];
        } else {
            profit = profit + max - min;
            max = min = prices[i];
        }
    }

    return profit + max - min;
};

/**
 * @param {number[]} prices
 * @return {number}
 */
// 别人的
var maxProfit = function(prices) {
    let profit = 0;

    for(let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i -1]) {
            profit  = profit + prices[i] - prices[i - 1];
        }
    }

    return profit;
};
