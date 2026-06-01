import java.util.*;
import java.util.concurrent.*;

public class ExecutorDemo {
    
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(4);
        List<Future<Integer>> futures = new ArrayList<>();
        for (int i = 1; i <= 8; i++) {
            final int n = i;
            futures.add(pool.submit(() -> {
                System.out.println("Task " + n + " on " + Thread.currentThread().getName());
                return n * n;
            }));
        }
        System.out.println("\nResults:");
        for (Future<Integer> f : futures) System.out.println(f.get());
        pool.shutdown();
    }
}