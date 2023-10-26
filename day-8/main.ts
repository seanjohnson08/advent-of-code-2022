let inputGrid: number[][] = [];

fetch('input')
  .then(response => response.text())
  .then(data => {
    const lines = data.trim().split('\n');
    inputGrid = lines.map(line => line.trim().split('').map(Number));
    calculateTreesVisible();
  });

function calculateTreesVisible() {
  const treesVisible: number[][] = [];
  const tallestTreeVertical: number[] = Array(inputGrid[0].length).fill(-1);

  for (let idy = 0; idy < inputGrid.length; idy++) {
    let tallestTreeHorizontal = -1;
    treesVisible.push([]);

    for (let idx = 0; idx < inputGrid[idy].length; idx++) {
      let visibility = 0;

      // Tree is visible from left
      if (inputGrid[idy][idx] > tallestTreeHorizontal) {
        tallestTreeHorizontal = inputGrid[idy][idx];
        visibility = 1;
      }

      // Tree is visible from top
      if (inputGrid[idy][idx] > tallestTreeVertical[idx]) {
        tallestTreeVertical[idx] = inputGrid[idy][idx];
        visibility = 1;
      }

      treesVisible[idy].push(visibility);
    }
  }

  tallestTreeVertical.fill(-1);

  for (let idy = inputGrid.length - 1; idy >= 0; idy--) {
    let tallestTreeHorizontal = -1;

    for (let idx = inputGrid[idy].length - 1; idx >= 0; idx--) {
      let visibility = 0;

      // Tree is visible from left
      if (inputGrid[idy][idx] > tallestTreeHorizontal) {
        tallestTreeHorizontal = inputGrid[idy][idx];
        visibility = 1;
      }

      // Tree is visible from top
      if (inputGrid[idy][idx] > tallestTreeVertical[idx]) {
        tallestTreeVertical[idx] = inputGrid[idy][idx];
        visibility = 1;
      }

      treesVisible[idy][idx] |= visibility;
    }
  }

  const sumVisibleTrees = treesVisible.reduce((acc, row) => acc + row.reduce((a, b) => a + b, 0), 0);
  console.log(`Part 1: ${sumVisibleTrees}`);
}
