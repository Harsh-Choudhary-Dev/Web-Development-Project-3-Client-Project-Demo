import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "servlet_1", value = "/servlet_1")
public class servlet_ extends HttpServlet {
    Database_connection db_connect= new  Database_connection();

    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        System.out.println("hello from servlet 1");
        String personName = request.getParameter("name");
        String email = request.getParameter("email");
        String comapanyName = request.getParameter("company_name");
        System.out.println(personName);
        System.out.println(comapanyName);
        System.out.println(email);
        Connection con;
        try {
            con = db_connect.connectDB("test");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        String insertQuery = "INSERT INTO Employees (name, email, company_name) VALUES (?,?,?)";
        PreparedStatement stmt = null;
        try {
            stmt = con.prepareStatement(insertQuery);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        try {
            stmt.setString(1, personName);
            stmt.setString(2, email);
            stmt.setString(3, comapanyName);
            stmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }


}