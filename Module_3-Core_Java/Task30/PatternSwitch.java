public class PatternSwitch {
    static String describe(Object obj) {
        return switch (obj) {
            case Integer i -> "Integer: " + i;
            case String s  -> "String of length " + s.length() + ": " + s;
            case Double d  -> "Double: " + d;
            case null      -> "null value";
            default        -> "Unknown type: " + obj.getClass().getSimpleName();
        };
    }
    public static void main(String[] args) {
        System.out.println(describe(42));
        System.out.println(describe("Hello"));
        System.out.println(describe(3.14));
        System.out.println(describe(true));
        System.out.println(describe(null));
    }
}