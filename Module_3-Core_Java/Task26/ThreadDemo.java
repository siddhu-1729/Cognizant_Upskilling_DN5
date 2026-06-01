public class ThreadDemo {

    static class Printer extends Thread {
        private final String msg;
        Printer(String msg) { 
            this.msg = msg; 
        }
        public void run() {
            for (int i = 0; i < 5; i++) 
                System.out.println(msg);
        }
    }
    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Printer("Hello from Thread 1");
        Thread t2 = new Printer("Hello from Thread 2");
        t1.start();
        t2.start();
        t1.join();
        t2.join();
    }
}