package imageManip;

import java.io.File;
import java.io.IOException;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;

public class Gridify {
	public static void main (String args[]) throws IOException{
		
		int GRID_SIZE = 20;
		int width = 608;    //width of the image
	    int height = 320;   //height of the image
	    BufferedImage image = null;
	    File f = null;
	    
	    f = new File("C:\\Users\\djsch\\Desktop\\coms309\\imageManipExp\\imageManip\\landscape.jpg"); //image file path
	    image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
	    image = ImageIO.read(f);
	    
	    for(int i=0; i<width; i=i+GRID_SIZE){
	    	for(int j=0; j<height; j++){
	    		image.setRGB(i, j, 000000);
	    	}
	    }
	    
	    for(int k=0; k<height; k=k+GRID_SIZE){
	    	for(int l=0; l<width; l++){
	    		image.setRGB(l, k, 000000);
	    	}
	    }
	    
	    f = new File("C:\\Users\\djsch\\Desktop\\coms309\\imageManipExp\\imageManip\\landscapeOUT.jpg");  //output file path
	    ImageIO.write(image, "jpg", f);
	    
	}
}
