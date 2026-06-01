//Class 
public class Car {
    String make, model;
    int year;
    Car(String make, String model, int year) {
        this.make = make; this.model = model; this.year = year;
    }
    void displayDetails() {
        System.out.println(year + " " + make + " " + model);
    }
    public static void main(String[] args) {
        //Object of Car has been created and Instantiated/Initialised
        Car c1 = new Car("Toyota", "Camry", 2022);
        Car c2 = new Car("Honda", "Civic", 2020);
        c1.displayDetails();
        c2.displayDetails();
    }
}