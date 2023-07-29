const twoSum = (nums: number[], target: number) => {
  const recurr: Record<number, number> = {}
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i]
    if (recurr[diff] !== undefined) return [recurr[diff], i]
    recurr[nums[i]] = i
  }
  return []
}

describe('TwoSum', () => {
  it('should return a list of indices whose sum equals target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toStrictEqual([0, 1])
    expect(twoSum([3, 2, 4], 6)).toStrictEqual([1, 2])
    expect(twoSum([3, 3], 6)).toStrictEqual([0, 1])
  })
})
