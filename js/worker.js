onmessage = ({ data }) => {
  sort(data)
  postMessage(data)
}

///////////////////////
// Utility functions
// usually `.sort` would be used
const sort = array => quicksort(array, 0, array.length - 1)

const quicksort = (array, min, max) => {
  // done
  if (min >= max || min < 0) {
    return
  }

  // sort into two buckets in place and get pivot index
  const pivot = partition(array, min, max)

  // sort each bucket
  quicksort(array, min, pivot - 1)
  quicksort(array, pivot + 1, max)
}

const partition = (array, min, max) => {
  const pivot = array[max]

  let i = min - 1  
  for (let j = min; j < max; j++) {
    // move to less-than bucket if less-than
    if (array[j] < pivot) {
      i++
      // swap @ i,j
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  i++
  // swap @ i,max
  array[max] = array[i]
  array[i] = pivot
  return i
}
