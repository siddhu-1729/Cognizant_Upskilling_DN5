import java.io.*;
import java.net.*;

public class Client {
    public static void main(String[] args) throws IOException {
        Socket s = new Socket("localhost", 5000);
        PrintWriter   out = new PrintWriter(s.getOutputStream(), true);
        BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
        BufferedReader kb = new BufferedReader(new InputStreamReader(System.in));
        String msg;
        while ((msg = kb.readLine()) != null) {
            out.println(msg);
            System.out.println("Server: " + in.readLine());
        }
    }
}