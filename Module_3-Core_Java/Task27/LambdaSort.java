import java.util.*;
public class LambdaSort {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>(
            Arrays.asList("Banana", "Apple", "Mango", "Cherry", "Date"));
        fruits.sort((a, b) -> a.compareTo(b));
        System.out.println("Sorted: " + fruits);
    }
}