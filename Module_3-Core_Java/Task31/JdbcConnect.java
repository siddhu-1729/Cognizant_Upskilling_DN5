import java.sql.*;
public class JdbcConnect {

    public static void main(String[] args) throws Exception {

        String url  = " "; // or jdbc:mysql://localhost:3306/school
        String sql  = "SELECT id, name, grade FROM students";
        try (Connection con = DriverManager.getConnection(url);
             Statement  st  = con.createStatement();
             ResultSet  rs  = st.executeQuery(sql)) {
            while (rs.next()) {
                System.out.printf("ID: %d | Name: %-15s | Grade: %s%n",
                    rs.getInt("id"), rs.getString("name"), rs.getString("grade"));
            }
        }
    }
}