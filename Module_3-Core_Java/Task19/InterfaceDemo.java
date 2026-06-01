public class InterfaceDemo {

    interface Playable { 
        void play();
    }

    static class Guitar implements Playable {
        public void play() { 
          System.out.println("Playing Guitar 🎸"); 
        }
    }
    static class Piano implements Playable {
        public void play() {
          System.out.println("Playing Piano 🎹"); 
        }
    }
    public static void main(String[] args) {
        Playable g = new Guitar();
        Playable p = new Piano();
        g.play();
        p.play();
    }
}