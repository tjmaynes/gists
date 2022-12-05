package interviewing.exercises;

public class ReverseAString {
    public static String reverseAString(String input) {
        StringBuffer stringBuffer = new StringBuffer(input.length());
        for (int i = input.length() - 1; i >= 0; i--) {
            stringBuffer.append(input.charAt(i));
        }
        return stringBuffer.toString();
    }
}
