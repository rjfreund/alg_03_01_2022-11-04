//https://www.geeksforgeeks.org/find-all-combinations-that-adds-upto-given-number-2/

// Javascript program to find out
// all combinations of positive
// numbers that add upto given
// number

/* arr - array to store the
combination
index - next location in array
num - given number
reducedNum - reduced number */
function getSumCombinationsRec(arr, index, num, reducedNum, combinations) {
    // Base condition
    if (reducedNum < 0)
        return;

    // If combination is
    // found, print it
    if (reducedNum == 0) {
        //for (let i = 0; i < index; i++)
        //console.log(arr.slice(0, index).join(" "));
        combinations.push(arr.slice(0, index));
        return;
    }

    // Find the previous number
    // stored in arr[]. It helps
    // in maintaining increasing
    // order
    let prev = (index == 0) ? 1 : arr[index - 1];

    // note loop starts from
    // previous number i.e. at
    // array location index - 1
    for (let k = prev; k <= num; k++) {
        // next element of
        // array is k
        arr[index] = k;

        // call recursively with
        // reduced number
        getSumCombinationsRec(arr, index + 1, num, reducedNum - k, combinations);
    }
    return combinations;
}

/* Function to find out all
combinations of positive
numbers that add upto given
number. It uses findCombinationsUtil() */
function getSumCombinations(n) {
    // array to store the combinations
    // It can contain max n elements
    let arr = [];

    // find all combinations
    let sumCombinations = getSumCombinationsRec(arr, 0, n, n, []);
    return sumCombinations;
}

function cut_rod(rod_length_inches, prices, gold_inches) {

}

function indicesOf(array1, array2) {
    let previousIndexOf = 0;
    let indicesOf = [];
    for (let i = 0; i < array2.length; i++) {
        let indexOf = array1.indexOf(array2[i], previousIndexOf);
        if (indexOf == -1) {
            return [-1];
        }
        if (indexOf >= 0) {
            previousIndexOf = indexOf + 1;
            indicesOf.push(indexOf);
        }
    }
    return indicesOf;

}

function get_rod_cut_price_combinations(rod_length_inches, rod_length_prices, gold_length_inches) {
    let rod_length_combinations = getSumCombinations(rod_length_inches);
    let gold_length_combinations = getSumCombinations(gold_length_inches).map(function (sumCombination) { return sumCombination.reverse(); }).reverse();
    let rod_length_price_combinations = [];
    for (let i = 0; i < rod_length_combinations.length; i++) {
        rod_length_price_combinations.push([]);
        for (let j = 0; j < rod_length_combinations[i].length; j++) {
            rod_length_price_combinations[i].push(
                {
                    rod_length: rod_length_combinations[i][j],
                    rod_length_price: rod_length_prices[rod_length_combinations[i][j] - 1],
                    is_gold_coated: false
                }
            );
        }
    }

    //need to work on this, making sure that the inner loops to detect whether some more
    //advanced form of index of to check to see if each number exists once or multiple times
    // in another ray of numbers - needs to be worked on - Thank you!    
    for (let i = 0; i < rod_length_price_combinations.length; i++) {
        for (let j = 0; j < gold_length_combinations.length; j++) {
            //console.log(rod_length_price_combinations[i].map(function (val) { return val.rod_length + ":" + val.rod_length_price + "|" + ((val.is_gold_coated) ? "G" : "M"); }).join(", "));
            (function () {
                for (let k = 0; k < gold_length_combinations[j].length; k++) {
                    let gold_length_found_indices = indicesOf(rod_length_price_combinations[i].map(function (val) { return val.rod_length; }), gold_length_combinations[j])
                    if (gold_length_found_indices[0] === -1) {
                        break;
                    }
                    let rod_length_price_combination_clone = JSON.parse(JSON.stringify(rod_length_price_combinations[i]));
                    for (let m = 0; m < gold_length_found_indices.length; m++) {
                        //need to revise this - perhaps clone rod_length_price_combinations
                        rod_length_price_combination_clone[gold_length_found_indices[m]].is_gold_coated = true;
                        rod_length_price_combination_clone[gold_length_found_indices[m]].rod_length_price *= 2;
                    }
                    console.log(
                        rod_length_price_combination_clone.map(function (val) { return val.rod_length + ":" + val.rod_length_price + "|" + ((val.is_gold_coated) ? "G" : "M"); }).join(", "),
                        " -- price_sum: " + rod_length_price_combination_clone.reduce(function (prev, current) {
                            return prev + current.rod_length_price;
                        }, 0));
                    break;
                }
            })();
        }
    }
    /*
    for (let i = 0; i < rod_length_price_combinations.length; i++) {
        for (let j = 0; j < gold_length_combinations.length; j++) {
            console.log(gold_length_combinations[j]);
            for (let k = 0; k < gold_length_combinations[j].length; k++) {
                let gold_length_found_indices = [];
                let rod_gold_length_found_index = rod_length_price_combinations[i].indexOf(gold_length_combinations[j][k])
                if (rod_gold_length_found_index == -1) { continue; }
                if (!gold_length_found_indices.find(function (element) {
                    return element.rod_length_price_index === rod_gold_length_found_index;
                })) {
                    gold_length_found_indices.push({
                        gold_length: gold_length_combinations[j][k],
                        gold_row_index: j,
                        gold_column_index: k,
                        rod_length_price_index: rod_gold_length_found_index
                    })
                }
                console.log(gold_length_found_indices.join(", "));
                for (let m = 0; m < rod_length_price_combinations[i].length; m++) {

                }
            }
        }
    }
    */

    /*
    rod_length_price_combinations.map(function (rod_length_price_combination) {
        console.log(rod_length_price_combination.map(function (val, index) {
            return + val.rod_length + ":" + val.rod_length_price + "|" + ((val.is_gold_coated) ? "G" : "M");
        }).join(", ") + " -- price_sum: " + rod_length_price_combination.reduce(function (prev, current) {
            return prev + current.rod_length_price;
        }, 0));
    });
    */

    /*
    for (let i = 0; i < rod_length_inches_price_combinations.length; i++) {
        let rod_length_inches_price_combinations_price_sum = 0;
        for (let j = 0; j < rod_length_inches_price_combinations[i].length; j++) {
            console.log("rod_length_inches: " + rod_length_inches_price_combinations[i][j].rod_length_inches + ", rod_length_price: " +
                rod_length_inches_price_combinations[i][j].rod_length_price);
            rod_length_inches_price_combinations_price_sum += rod_length_inches_price_combinations[i][j].rod_length_price;
        }
        console.log("rod_length_inches_price_combinations_price_sum: " + rod_length_inches_price_combinations_price_sum);
    }
    */

}

// Driver Code

// let n = 10;
// let sumCombinations = getSumCombinations(n);
// for (let i = 0; i < sumCombinations.length; i++) {
//     console.log(sumCombinations[i].join(" "));
// }

var rod_length_inches = 10;
var prices = [1, 14, 35, 44, 45, 60, 91, 110, 117, 158];
var gold_length_inches = 4;

get_rod_cut_price_combinations(rod_length_inches, prices, gold_length_inches);

//console.log(indicesOf([1, 1, 1, 1, 2], [1, 1, 2]))