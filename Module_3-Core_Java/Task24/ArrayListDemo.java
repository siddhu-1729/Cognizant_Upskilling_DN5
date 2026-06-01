import java.util.*;

public class ArrayListDemo {
    
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        System.out.println("Add names (type 'done' to stop):");
        while (true) {
            System.out.print("> ");
            String name = sc.nextLine();
            if (name.equalsIgnoreCase("done")) break;
            names.add(name);
        }
        System.out.println("Names: " + names);
    }
}