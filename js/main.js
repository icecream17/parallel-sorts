// run:
// node main.js <number of threads>

import { argv } from 'node:process'

const tosort = [86, 69, 20, 36, 79, 40, 41, 64, 3, 31, 87, 62, 94, 49, 12, 99, 42, 58, 73, 52, 18, 48, 70, 0, 43, 71, 45, 34, 44, 54, 51, 98, 76, 1, 14, 81, 17, 25, 29, 68, 16, 8, 35, 93, 67, 4, 9, 55, 92, 46, 26, 37, 39, 50, 59, 88, 65, 23, 96, 27, 74, 77, 97, 72, 28, 78, 89, 53, 2, 7, 24, 10, 85, 84, 82, 11, 60, 22, 30, 38, 47, 33, 6, 57, 90, 83, 95, 19, 21, 80, 13, 75, 15, 66, 56, 91, 61, 32, 5, 63]

const numthreads = Math.min(unsorted.length, Number(argv[2]))

// Step 1: Make a list of buckets in sorted order
const buckets = []
for (let i = 0; i < numthreads; i++) {
  const bucketelem = tosort.pop()
  const insertat = buckets.lastIndexOf(x => x[0] < bucketelem) + 1
  buckets.splice(insertat, 0, [bucketelem])
}

// Step 2: Add elements to correct buckets
while (tosort.length) {
  const elem = tosort.pop()
  const insertat = buckets.lastIndexOf(x => x[0] < bucketelem) + 1
  buckets[insertat].push(elem)
}

// Step 3: Create threads + send each thread a bucket to sort + when all is finish, output
const threads = []
let threadsleft = numthreads
for (let i = 0; i < numthreads; i++) {
  threads.push(new Worker("worker.js"))
  threads[i].onmessage = ({ data }) => {
    threads[i] = data
    threadsleft--
    if (threadsleft === 0) {
      console.log(String(threads)) // taking advantage of Javascript Array toString
    }
  }
  threads[i].postMessage(buckets[i])
  // or:
  // threads[i].postMessage(undefined, [Uint8Array.from(buckets[i]).buffer])
}
