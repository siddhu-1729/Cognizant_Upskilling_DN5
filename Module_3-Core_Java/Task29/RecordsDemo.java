import java.util.*;

public class RecordsDemo {
    record Person(String name, int age) {
        
    }
    public static void main(String[] args) {
        List<Person> people = List.of(
            new Person("Alice", 30),
            new Person("Bob", 17),
            new Person("Charlie", 25),
            new Person("Diana", 15)
        );
        people.forEach(System.out::println);
        System.out.println("\nAdults:");
        people.stream()
            .filter(p -> p.age() >= 18)
            .forEach(System.out::println);
    }
}