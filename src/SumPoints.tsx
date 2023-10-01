const SumPoints = (points:Array<number>) => {
    let sum = 0;
    points.forEach(i => {
        sum += i;
    });
    return sum;
}
export default SumPoints; 