import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/user")
public class User {
    @GET

    @Produces("text/plain")
    public String getUserList() {
        return "Qilin Yang";
    }
}
