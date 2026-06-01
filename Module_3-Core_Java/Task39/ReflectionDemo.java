import java.lang.reflect.*;

public class ReflectionDemo {

    public static void main(String[] args) throws Exception {

        Class<?> cls = Class.forName("java.lang.String");
        System.out.println("Class: " + cls.getName());
        System.out.println("\nMethods:");
        for (Method m : cls.getDeclaredMethods()) {
            System.out.printf("  %s(%s)%n", m.getName(),
                java.util.Arrays.toString(m.getParameterTypes()));
        }
        // Dynamically invoke a method
        Method concat = cls.getMethod("concat", String.class);
        String result = (String) concat.invoke("Hello, ", "World!");
        System.out.println("\nconcat result: " + result);
    }
}