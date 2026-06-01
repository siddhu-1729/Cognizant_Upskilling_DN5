import java.util.Scanner;
public class StringReverse {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String s = sc.nextLine();
        // String rev = new StringBuilder(s).reverse().toString();
        // System.out.println("Reversed: " + rev);
        StringBuilder rev=new StringBuilder();
          for(int i=s.length()-1;i>=0;i--){
             rev.append(s.charAt(i));
          }
        System.out.println("Reversed: " + rev.toString());
    }
}