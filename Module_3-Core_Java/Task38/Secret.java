// 1. Write and compile a simple class
public class Secret {
    private int value = 42;
    public int getValue() { return value; }
}
// 2. Compile: javac Secret.java
// 3. Decompile using CFR:
//    java -jar cfr.jar Secret.class
// 4. Or use JD-GUI (GUI tool) — drag and drop Secret.class
//
// CFR output will resemble the original source:
// public class Secret {
//     private int value = 42;
//     public int getValue() { return this.value; }
// }