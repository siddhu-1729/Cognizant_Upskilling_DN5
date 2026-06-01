public class VirtualThreads {
    public static void main(String[] args) throws InterruptedException {
        int count = 100_000;
        Thread[] threads = new Thread[count];
        long start = System.currentTimeMillis();
        for (int i = 0; i < count; i++) {
            int id = i;
            threads[i] = Thread.ofVirtual().start(() -> {
                // Simulate lightweight work
                if (id % 10_000 == 0)
                    System.out.println("Virtual thread " + id + " running");
            });
        }
        for (Thread t : threads) t.join();
        System.out.println("Done in " + (System.currentTimeMillis() - start) + "ms");
    }
}