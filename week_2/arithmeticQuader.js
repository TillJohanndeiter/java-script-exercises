/* Sum of all arithmetic cuboid with volume smaller than 100 million. */

MAX_VOLUME = 100000000

const calcVolume = (startValue, difference) => startValue * (difference + startValue) * (2 * difference + startValue)


sumOfVolumes = 0

for (var startValue = 1; calcVolume(startValue, 1) < MAX_VOLUME; startValue++) {
    for (var difference = 1; calcVolume(startValue, difference) < MAX_VOLUME; difference++) {
        sumOfVolumes += calcVolume(startValue, difference)
    }
}

console.log(sumOfVolumes)