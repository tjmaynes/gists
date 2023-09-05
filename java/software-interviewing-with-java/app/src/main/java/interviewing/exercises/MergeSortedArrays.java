package interviewing.exercises;

import java.util.ArrayList;
import java.util.List;

public class MergeSortedArrays {
    public static <T> List<Integer> mergeSortedArrays(List<Integer> arr1, List<Integer> arr2) {
        if (arr1.isEmpty()) return arr2;
        if (arr2.isEmpty()) return arr1;

        ArrayList newList = new ArrayList();
        int currentArr1Item = arr1.get(0);
        int currentArr2Item = arr2.get(0);
        int i = 0; int j = 0;

        while (true) {
            if (currentArr1Item < currentArr2Item) {
                newList.add(currentArr1Item);
                i += 1;
                if (i < arr1.size()) {
                    currentArr1Item = arr1.get(i);
                } else {
                    break;
                }
            } else {
                newList.add(currentArr2Item);
                j += 1;
                if (j < arr2.size()) {
                    currentArr2Item = arr2.get(j);
                } else {
                    break;
                }
            }
        }

        for (int k = i; k < arr1.size(); k++) {
            newList.add(arr1.get(k));
        }

        for (int k = j; k < arr2.size(); k++) {
            newList.add(arr2.get(k));
        }

        return newList;
    }
}
