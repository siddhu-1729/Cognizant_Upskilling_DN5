public class TypeCasting {
    public static void main(String[] args) {
        double d = 9.99;
        int i = (int) d;
        System.out.println("double to int: " + d + " -> " + i);
        int x = 7;
        double y = (double) x;
        System.out.println("int to double: " + x + " -> " + y);
    }
}