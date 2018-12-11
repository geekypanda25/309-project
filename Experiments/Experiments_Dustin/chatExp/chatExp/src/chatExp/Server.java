package chatExp;

import java.net.*;
import java.io.*;
import java.util.*;

public class Server implements Runnable {
	public Socket connection;
	public ArrayList<Server> servers;
	
	public static void main(String[] args) {
		int port = 16661;
		ArrayList<Server> serverList = new ArrayList<Server>();
		try {
			ServerSocket socket1 = new ServerSocket(port);
			System.out.println("Server Initialized");
			while (true) {
				Socket connection = socket1.accept();
				Runnable runnable = new Server(connection);
				serverList.add((Server)runnable);
				((Server)runnable).setServerList(serverList);
				Thread thread = new Thread(runnable);
				thread.start();
			}
		} catch (Exception e) {
			System.out.println("Exception from server: " + e);
		}
	}

	Server(Socket s) {
		this.connection = s;
	}
	
	public void setServerList(ArrayList<Server> list){
		this.servers = list;
	}
	
	public void readFromClient() throws IOException{
		BufferedInputStream is = new BufferedInputStream(connection.getInputStream());
		InputStreamReader isr = new InputStreamReader(is);
		int character;
		StringBuffer process = new StringBuffer();
		
		while ((character = isr.read()) != 13) {
			process.append((char) character);
		}
		
		System.out.println(process);
		for(Server server : this.servers){
			if(!server.connection.equals(this.connection)){
				server.writeToClient(process.toString() + (char)13);
			}
		}
	}
	
	public void writeToClient(String toWrite) throws IOException{
		BufferedOutputStream os = new BufferedOutputStream(this.connection.getOutputStream());
		OutputStreamWriter osw = new OutputStreamWriter(os, "US-ASCII");
		osw.write(toWrite);
		osw.flush();
	}

	public void run() {
		try {
			while(true){
				this.readFromClient();
			}
		} catch (Exception e) {
			System.out.println("Exception from server: " + e);
		} finally {
			try {
				connection.close();

			} catch (IOException e) {
			}
		}
	}

}
