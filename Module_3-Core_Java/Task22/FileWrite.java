import java.io.*;
import java.util.Scanner;

public class FileWrite {

    public static void main(String[] args) throws IOException {

        Scanner sc = new Scanner(System.in);
        System.out.print("Enter text to write: ");
        String text = sc.nextLine();

        try (BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
            bw.write(text);
        }
        System.out.println("Data written to output.txt");
    }
}