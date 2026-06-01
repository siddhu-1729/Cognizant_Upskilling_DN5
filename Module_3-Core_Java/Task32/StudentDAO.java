import java.sql.*;
public class StudentDAO {
    private final Connection con;
    StudentDAO(Connection con) { this.con = con; }
    void insert(int id, String name, String grade) throws SQLException {
        String sql = "INSERT INTO students(id, name, grade) VALUES(?, ?, ?)";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, id); ps.setString(2, name); ps.setString(3, grade);
            ps.executeUpdate();
            System.out.println("Inserted: " + name);
        }
    }
    void update(int id, String newGrade) throws SQLException {
        String sql = "UPDATE students SET grade=? WHERE id=?";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, newGrade); ps.setInt(2, id);
            ps.executeUpdate();
            System.out.println("Updated grade for ID " + id);
        }
    }
    public static void main(String[] args) throws Exception {
        try (Connection con = DriverManager.getConnection(" ")) {
            StudentDAO dao = new StudentDAO(con);
            dao.insert(1, "Alice", "A");
            dao.update(1, "A+");
        }
    }
}