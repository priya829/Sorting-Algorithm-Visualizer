let values = [];
let w = 10;

let states = [];
var speedval = 50;
function go() {
  // console.log(values);
  var technique = document.getElementById("inputGroupSelect01").value;
  speedval -= document.getElementById("myRange").value;

  console.log(speedval);
  console.log(technique);
  if (technique == 1) {
    console.log("Bubble Sort");
    BubbleSort(values, 0, values.length - 1);
  } else if (technique == 2) {
    console.log("Quick Sort");
    quickSort(values, 0, values.length - 1);
  } else if (technique == 3) {
    mergeSort(values, 0, values.length - 1);
  } else if (technique == 4) {
    console.log("Selection Sort");
    SelectionSort(values, 0, values.length - 1);
  } else {
    console.log("Insertion Sort");
    InsertionSort(values, 0, values.length - 1);
  }
}
function setup() {
  let canvas = createCanvas(windowWidth - 1, windowHeight-100);
  values = new Array(floor(width / w));
  canvas.parent('canvas');  
	canvas.style('display', 'block');
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end),
  ]);
}
async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 2;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

// Merge Sort Done.
async function mergeSort(arr, start, end){
  if(start >= end){
    return ;
  }
  let mid = parseInt((start+end)/2);
  
  await Promise.all([
    mergeSort(arr, start, mid),
    mergeSort(arr, mid+1, end)
  ]);
  await merge(arr, start, mid, end);
  if(start == 0 && end == (arr.length - 1)){
    states.fill(3)
  }
}

async function merge(arr, start, mid, end){
  for(let i = start; i <= end; i++){
    states[i] = 2;
  }
  let n = mid - start + 1;
  let m = end - mid ;
  let arr_left = new Array(n);
  let arr_right = new Array(m); 
  for(let i = 0;i < n; i++){
    arr_left[i] = arr[start + i];
  }
  for(let j = 0; j < m;j++){
    arr_right[j] = arr[mid + j + 1];
  }
  let i = 0, j = 0, k = start;
  states[i] = 0;
  states[j] = 0;
  while(i<n && j<m){
    if(arr_left[i] <= arr_right[j]){
      states[k] = 3;
      states[start + i] = 3;
      await copyIndex(arr, arr_left,k,i);
      i++;
      states[start + i] = 0;
    }
    else {
      states[mid + j + 1] = -1;
      states[k] = 3;
      await copyIndex(arr, arr_right,k,j);
      j++;
      states[mid + j + 1] = 0;
    }
    k++;
  }
  while(i < n){
    states[k] = 3;
    states[start + i] = 3;
    await copyIndex(arr, arr_left, k,i);
    k++,i++;
    states[start + i] = 0;
  }
  while(j<m){
    states[mid + j + 1] = -1;
    states[k] = 3;
    await copyIndex(arr, arr_right,k,j);
    k++,j++;
    states[mid + j + 1] = 0;
  }

}
//Bubble sort Done.
async function BubbleSort(arr, start, end) {
  for (i = start; i < end; i++) {
    for (j = start; j <= end - i - 1; j++) {
      states[j] = 0;
      await sleep(speedval);
      if (arr[j] > arr[j + 1]) {
        await swap(arr, j, j + 1);
      }
      states[j] = -1;
    }
    states[j] = 3
  }
}
// Insertion Sort Done,
async function InsertionSort(arr, start, end) {
  console.log("arr");
  for (i = start; i <= end; i++) {
    var cur = arr[i];
    j = i - 1;
    states[i] = 0;
    while (j >= 0 && arr[j] > cur) {
      states[j] = 2;
      await equal(arr, j + 1, j);
      j--;
    }
    arr[j + 1] = cur;
    states.fill(-1);
    states[j + 1] = 3;
  }
  states.fill(3);
}
// Selection Sort Done.
async function SelectionSort(arr, start, end) {
  for (i = 0; i < end; i++) {
    var minidx = i;
    states[i] = 1;
    for (j = i + 1; j <= end; j++) {
      states[j] = 0;
      await sleep(speedval);
      if (arr[j] < arr[minidx]) {
        states[minidx] = -1;
        minidx = j;
        states[minidx] = 1;
      } else states[j] = -1;
    }
    states[minidx] = -1;
    await swap(arr, i, minidx);
    states[i] = 3;
  }
}

function draw() {
  background(0);
  
  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill("#6600ff");
    } else if (states[i] == 1) {
      fill("#FF0000");
    } else if (states[i] == 2) {
      fill("#ffffcc");
    } else if (states[i] == 3) {
      fill("#80ff80");
    } else {
      fill(255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}

async function swap(arr, a, b) {
  await sleep(speedval);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

async function equal(arr, i, j) {
  await sleep(speedval);
  arr[i] = arr[j];
}

async function copyIndex(arr1, arr2, a, b){
  await sleep(speedval);
  arr1[a] = arr2[b];
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
