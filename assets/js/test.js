/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargestLevelSum = function (root, k) {
    let queue = [root];
    let cur_level = 0
    let sums = []
    while (queue.length > 0) {
        let count = queue.length;
        let cur_sum = 0;
        for (let i=0;i<count;i++){
            let node = queue.shift();
            cur_sum+=node.val;
            queue.push(node.left)
            queue.push(node.right)
        }
        sums.push(cur_sum)
       

    }
   if (k > sums.length) return -1
   sums.sort((a, b) => b - a)
   return sums[k-1]

};

console.log(kthLargestLevelSum(
    {
        val: 1,
        left:
        {
            val: 1,
            left: null,
            right: null,
        },
        right: {
            val: 1,
            left: null,
            right: null,
        }
    },
    3))