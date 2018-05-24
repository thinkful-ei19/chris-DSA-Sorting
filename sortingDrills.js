/*
QuickSort
Write a function qSort that sorts a dataset using the quicksort algorithm. 
The dataset to to sort is 
89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 
65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 
98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5
*/

let string = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'
let arr = string.split(' ').map((item) => Number(item));

function swap (array, i, j) {
    let placeholder = array[i];
    array[i] = array[j];
    array[j] = placeholder;
}

//Need to review
function qSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }

    function partition(array, start, end) {
        const pivot = arr[end-1];
        let j = start;
        for (let i=start; i < end -1; i++) {
            if (array[i] < pivot) {
                swap(array, i, j);
                j++
            }
        }
        swap(array, end-1, j);
        return j;
    }

    const middle = partition(array, start, end);
    array = qSort(array, start, middle);
    array = qSort(array, middle + 1, end);
    return array;
}

// console.log(qSort(arr))

//Need To review
function mSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    function merge(left, right, array) {
        let leftIndex = 0;
        let rightIndex = 0;
        let outputIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                array[outputIndex++] = left[leftIndex++];
            }
            else {
                array[outputIndex++] = right[rightIndex++];
            }
        }

        for (let i=leftIndex; i < left.length; i++) {
            array[outputIndex++] = left[i];
        }

        for (let i=rightIndex; i<right.length; i++) {
            array[outputIndex++] = right[i];
        }
        return array;
    }

    left = mSort(left);
    right = mSort(right);
    return merge(left, right, array);

}

// console.log(mSort(arr));

let bucketString = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 99 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'
let bucketArr = bucketString.split(' ').map((item) => Number(item));

function bucketSort(array, lowest, highest) {
    let buckets = [];
    
    for (i=0; i<array.length-1; i++) {
        let sortBucket = Math.floor(array[i]/(highest-lowest)*10)
        if (buckets[sortBucket]) {
            buckets[sortBucket].push(array[i])
        } else {
            buckets[sortBucket] = [array[i]]
        }
    }

    buckets.map((bucketArr) => {
        if (bucketArr.length > 1) {
            mSort(bucketArr)
        }
    })

    let result = [];

    buckets.forEach(items=> {
        if (items.length > 1) {
            items.forEach((item) => {
                result.push(item)
            })
        }
        else if (items) {
            result.push(items[0])
        }
    })

    return result
}

// console.log(bucketSort(bucketArr, 1, 99));

function shuffle(array) {
    for (let i=0; i<array.length; i++) {
        let random = Math.floor(Math.random() * array.length);
        let randomTwo = Math.floor(Math.random() * array.length);
        swap(array, random, randomTwo)
    }
    //This will swap two random items in the array a number of times equal to the array's length
    return array;
}


// console.log(shuffle(arr))

let books = ['Ber', 'To', 'Z', 'Al']

function sortBooks(array) {
    let buckets = [];
    
    for (i=0; i<array.length; i++) {
        let book = array[i].split('').map((letter) => letter.toLowerCase()).join('')
        let bookValue = book.charCodeAt(0)-97
        let sortBucket = Math.floor(bookValue/(122-97)*10)
        console.log(sortBucket)
        if (buckets[sortBucket]) {
            buckets[sortBucket].push(array[i])
        } else {
            buckets[sortBucket] = [array[i]]
        }
    }

    buckets.map((bucketArr) => {
        if (bucketArr.length > 1) {
            mSort(bucketArr)
        }
    })

    let result = [];

    buckets.forEach(items=> {
        if (items.length > 1) {
            items.forEach((item) => {
                result.push(item)
            })
        }
        else if (items) {
            result.push(items[0])
        }
    })

    return result
}

console.log(sortBooks(books))