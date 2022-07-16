use std::{collections::HashMap, vec};

#[allow(dead_code)]
fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut seen: HashMap<i32, usize> = HashMap::new();
    for (index, num) in nums.into_iter().enumerate() {
        let diff = target - num;
        if let Some(prev_index) = seen.get(&diff) {
            return vec![*prev_index as i32, index as i32];
        } else {
            seen.insert(num, index);
        }
    }
    
    unreachable!()
}

#[cfg(test)]
mod test {
    use super::*;
    
    #[test]
    fn test_two_sum() {
        assert_eq!(vec![0, 1], two_sum(vec![2, 7, 11, 15], 9));
        assert_eq!(vec![1, 2], two_sum(vec![3, 2, 4], 6));
        assert_eq!(vec![0, 1], two_sum(vec![3, 3], 6))
    }
}