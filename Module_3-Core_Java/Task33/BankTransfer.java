import java.sql.*;

public class BankTransfer {

    static void transfer(Connection con, int from, int to, double amount) throws SQLException {

        con.setAutoCommit(false);
        try {
            try (PreparedStatement debit = con.prepareStatement(
                     "UPDATE accounts SET balance = balance - ? WHERE id = ?");
                 PreparedStatement credit = con.prepareStatement(
                     "UPDATE accounts SET balance = balance + ? WHERE id = ?")) {
                debit.setDouble(1, amount); 
                debit.setInt(2, from); 
                debit.executeUpdate();
                credit.setDouble(1, amount); 
                credit.setInt(2, to); 
                credit.executeUpdate();
            }
            con.commit();
            System.out.println("Transfer successful: " + amount);
        } catch (SQLException e) {
            con.rollback();
            System.out.println("Transfer failed, rolled back: " + e.getMessage());
        } finally {
            con.setAutoCommit(true);
            // con.close();
        }
    }

    public static void main(String[] args) throws Exception {
        try (Connection con = DriverManager.getConnection(" ")) {
            transfer(con, 1, 2, 500.0);
        }
    }
}