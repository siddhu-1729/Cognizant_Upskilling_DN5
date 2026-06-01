import java.util.Scanner;
public class CustomException {
    
    static class InvalidAgeException extends Exception {
        InvalidAgeException(String msg) {
             super(msg); 
        }
    }

    static void checkAge(int age) throws InvalidAgeException {
        if (age < 18) throw new InvalidAgeException("Age " + age + " is below 18.");
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your age: ");
        int age = sc.nextInt();
        try {
            checkAge(age);
            System.out.println("Access granted.");
        } catch (InvalidAgeException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}