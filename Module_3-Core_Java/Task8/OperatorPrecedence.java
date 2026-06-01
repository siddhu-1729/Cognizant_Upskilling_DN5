public class OperatorPrecedence {
    public static void main(String[] args) {
        int a = 10 + 5 * 2;
        System.out.println("10 + 5 * 2 = " + a);  // 20, not 30
        int b = (10 + 5) * 2;
        System.out.println("(10 + 5) * 2 = " + b); // 30
        int c = 10 + 4 / 2 - 1;
        System.out.println("10 + 4 / 2 - 1 = " + c); // 11
        int d = 2 + 3 * 4 - 6 / 2;
        System.out.println("2 + 3 * 4 - 6 / 2 = " + d); // 11
    }
}