export class Random {
    private constructor() {}

    /**
      * Get a random float in range [start..end)
      * when only start, then random float in range [0..start)
      */
    static float(start: number, end?: number): number {
        if (end == null)
            [start, end] = [0, start]
        return Math.random() * (end - start) + start
    }

    /**
      * Get a random int in range [start..end)
      * when only start, then random int in range [0..start)
      */
    static int(start: number, end?: number): number {
        return Math.trunc(this.float(start, end))
    }

    /** Get a random item in iterable object */
    static choice<T>(it: Iterable<T>): T {
        const arr = it instanceof Array<T> ? it as T[] : Array.from(it)
        const idx = this.int(arr.length)
        return arr[idx]
    }

    /** In-place shuffle array */
    static shuffle<T>(arr: T[]): T[] {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = this.int(i + 1)
            const t = arr[i]
            arr[i] = arr[j]
            arr[j] = t
        }
        return arr
    }

    /**
      * Get a random bool with chance
      * @param chance Custom chance [0..1] (default: 0.5)
      */
    static bool(chance = 0.5): boolean {
        return Math.random() < chance
    }
}
