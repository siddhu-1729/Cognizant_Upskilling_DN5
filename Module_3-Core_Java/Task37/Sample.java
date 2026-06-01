// Sample class to compile and inspect
public class Sample {
    int add(int a, int b) { return a + b; }
    public static void main(String[] args) {
        Sample s = new Sample();
        System.out.println(s.add(3, 4));
    }
}
// Compile:
//   javac Sample.java
// Inspect bytecode:
//   javap -c Sample
//
// Expected javap output for add():
//   0: iload_1
//   1: iload_2
//   2: iadd
//   3: ireturn