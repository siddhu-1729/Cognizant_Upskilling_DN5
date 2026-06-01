import java.util.*;

public class HashMapDemo {
    public static void main(String[] args) {
        
        Map<Integer, String> students = new HashMap<>();
        Scanner sc = new Scanner(System.in);
        System.out.println("Add entries (id name), type 0 to stop:");
        while (true) {
            System.out.print("ID: ");
            int id = sc.nextInt();
            if (id == 0) break;
            System.out.print("Name: ");
            students.put(id, sc.next());
        }
        System.out.print("Lookup ID: ");
        int key = sc.nextInt();
        System.out.println(students.getOrDefault(key, "Not found"));
    }
}