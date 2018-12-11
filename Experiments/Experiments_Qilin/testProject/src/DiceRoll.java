import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Path("/dice")
public class DiceRoll {
    @GET
    @Path("/roll/{max}")
    @Produces("/text/html")
    public String rollDice(@PathParam("max") String maximum) {
        return "<html><body>" + "<Name>" + maximum + "</Name>" + "</body></html>";
    }
}
