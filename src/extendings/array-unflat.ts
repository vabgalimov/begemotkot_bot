interface Array<T> {
    unflat(size: number): T[][]
}

if (!Array.prototype.unflat) {
    Array.prototype.unflat = function unflat<T>(size: number): T[][] {
        const newArr: T[][] = []
        const newLen = Math.trunc(this.length / size)
        for (let i = 0; i < newLen; i++) {
            const group: T[] = []
            for (let j = 0; j < size; j++) {
                group.push(this[i * size + j])
            }
            newArr.push(group)
        }
        return newArr
    }
}
