import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/htmltest")
public class HTMLTest {
    @GET

    @Produces("text/html")
    public String getUserList() {
        return "<html>\n" +
                "<body>\n" +
                "\n" +
                "<canvas id=\"myCanvas\" width=\"200\" height=\"100\" style=\"border:1px solid #d3d3d3;\">\n" +
                "Your browser does not support the HTML5 canvas tag.</canvas>\n" +
                "\n" +
                "<script>\n" +
                "var c = document.getElementById(\"myCanvas\");\n" +
                "var ctx = c.getContext(\"2d\");\n" +
                "ctx.moveTo(0,0);\n" +
                "ctx.lineTo(200,100);\n" +
                "ctx.stroke();\n" +
                "</script>\n" +
                "\n" +
                "</body>\n" +
                "</html>\n" +
                "\n";
    }
}
