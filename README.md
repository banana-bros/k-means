# k-means

[![Build Status](https://travis-ci.org/alkocats/k-means.svg?branch=master)](https://travis-ci.org/alkocats/k-means)
[![Test Coverage](https://api.codeclimate.com/v1/badges/35aa6a4af9216b9fd46f/test_coverage)](https://codeclimate.com/github/alkocats/k-means/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/35aa6a4af9216b9fd46f/maintainability)](https://codeclimate.com/github/alkocats/k-means/maintainability)
[![npm version](https://badge.fury.io/js/%40alkocats%2Fk-means.svg)](https://badge.fury.io/js/%40alkocats%2Fk-means)
[![MIT License](https://img.shields.io/github/license/alkocats/k-means.svg)](https://github.com/alkocats/k-means/blob/master/LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/github/alkocats/k-means/badge.svg)](https://snyk.io/test/github/alkocats/k-means)

This package is a typescript implementation of the k-means algorithm with different customization capabilities.

- [Installation](#installation)
- [Usage](#usage)
  - [Options](#options)
  - [Metrics](#metrics)
  - [Centroid Calculators](#centroid-calculators)
  - [CentroidSelection](#centroidselection)
  - [EmptyAction](#emptyaction)
- [Contributing](#contributing)
- [License](#license)

## Installation

Use npm to install k-means:

```bash
npm install k-means
```

## Usage

Simplest setup for the usage of k-means:

```typescript
import { KMeans, Vector } from '@alkocats/k-means'

const kMeans = new KMeans({
    clusterCount: 2
});
const points: Vector[] = [
    [1, 1],
    [1.5, 2],
    [3, 4],
    [5, 7],
    [3.5, 5],
    [4.5, 5],
    [3.5, 4.5],
];
const result = kMeans.fit(points);

// As the starting centroids are set randomly, this values might change
// or one cluster might even get deleted
console.log(result.meanSquaredError);
// 0.9252
console.log(result.iterations);
// 6
console.log(result.clusters[0].centroid);
// [ 3.9, 5.1 ]
console.log(result.clusters[0].vectors);
// [ [ 3, 4 ], [ 5, 7 ], [ 3.5, 5 ], [ 4.5, 5 ], [ 3.5, 4.5 ] ]
console.log(result.clusters[1].centroid);
// [ 1.25, 1.5 ]
console.log(result.clusters[1].vectors);
// [ [ 1, 1 ], [ 1.5, 2 ] ]
```

### Options

| Name                 | Type                 | Default                        |
| -------------------- | -------------------- | ------------------------------ |
| `metric`             | `Metric`             | `new EuclidianDistance()`      |
| `centroidCalculator` | `CentroidCalculator` | `new MeanCentroidCalculator()` |
| `clusterCount`       | `number`             | `1`                            |
| `maxIterations`      | `number`             | `100`                          |
| `centroidSelection`  | `CentroidSelection`  | `CentroidSelection.RANDOM`     |
| `centroids`          | `Vector[] | Matrix`  | `null`                         |
| `emptyAction`        | `EmptyAction`        | `EmptyAction.DROP`             |

### Metrics

- `new EuclidianDistance()`: Calculates the euclidian distance between two vectors with the same number of elements (n).
- `new ManhattanDistance()`: Calculates the manhattan distance between two vectors with the same number of elements (n).

### Centroid Calculators

- `new MeanCentroidCalculator()`: Calculates the center of an array of vectors according to the mean of the vectors.
- `new MedianCentroidCalculator()`: Calculates the center of an array of vectors according to the median of the vectors.

### CentroidSelection

- `CentroidSelection.RANDOM`: Generates n (accodring to `clusterCount`) starting centroids by selecting random points within the vector limits.
- `CentroidSelection.PREDEFINED`: Takes the centroids given by `centroids` as the starting centroids.
- `CentroidSelection.KMEANSPLUSPLUS`: Uses the k-means++ algorithm to determine the starting centroid.

### EmptyAction

- `EmptyAction.DROP`: Deletes a cluster if it does not have any vectors assigned to.
- `EmptyAction.ERROR`: Throws an error if any cluster does not have any vectors assigned to.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
