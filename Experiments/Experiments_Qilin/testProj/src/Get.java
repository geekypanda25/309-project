import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Path("/get")
public class Get {
    @GET
    @Path("/name/{nm}")
    @Produces("text/html")
    public String userName(@PathParam("nm") String name)
    {
        return "<html><body>" + "<Name>" + name + "</Name>" + "</body></html>";
    }

    @GET
    @Path("/address/{ad}")
    @Produces("text/html")
    public String userAge(@PathParam("ad") String address)
    {
        return "<html><body>" + "<Address>" + address + "</Address>" + "</body></html>";
    }
}
