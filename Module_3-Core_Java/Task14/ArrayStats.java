import java.util.Scanner;
public class ArrayStats {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("How many elements? ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            System.out.print("Element " + (i+1) + ": ");
            arr[i] = sc.nextInt();
        }
        long sum = 0;
        for (int x : arr) sum += x;
        System.out.println("Sum: " + sum);
        System.out.printf("Average: %.2f%n", (double) sum / n);
    }
}