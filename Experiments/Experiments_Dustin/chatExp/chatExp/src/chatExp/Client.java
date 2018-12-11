package chatExp;

import java.net.*;
import java.util.Scanner;
import java.io.*;

public class Client implements Runnable {
	public Socket connection;
	public BufferedOutputStream bos;
	public OutputStreamWriter osw;
	public BufferedInputStream bis;
	public InputStreamReader isr;
	public String username;

	public static void main(String args[]) {
		String host = "localhost";
		int port = 16661;

		StringBuffer instr = new StringBuffer();
		System.out.println("Client initialized");

		try {
			InetAddress address = InetAddress.getByName(host);
			Socket connection = new Socket(address, port);
			BufferedOutputStream bos = new BufferedOutputStream(connection.getOutputStream());
			OutputStreamWriter osw = new OutputStreamWriter(bos, "US-ASCII");
			BufferedInputStream bis = new BufferedInputStream(connection.getInputStream());
			InputStreamReader isr = new InputStreamReader(bis, "US-ASCII");

			System.out.println("Enter your name");
			Scanner in = new Scanner(System.in);
			String username = in.nextLine();

			Runnable runnable = new Client(connection, bos, osw, bis, isr, username);
			Thread thread = new Thread(runnable);
			thread.start();

			while (true) {

				int c;
				while ((c = isr.read()) != 13) {
					instr.append((char) c);
				}

				System.out.println(instr);
				instr.delete(0, instr.length());

			}

		} catch (Exception e) {
			System.out.println("Exception from client: " + e);
		}
	}

	public Client(Socket s, BufferedOutputStream b, OutputStreamWriter o, BufferedInputStream b2, InputStreamReader i,
			String username) {
		this.connection = s;
		this.bos = b;
		this.osw = o;
		this.bis = b2;
		this.isr = i;
		this.username = username;
	}

	public void run() {
		while(true){
			try {
				System.out.println("Say something");
				Scanner in = new Scanner(System.in);
				String userInput = in.nextLine();
				osw.write(this.username + ": " + userInput + (char) 13);
				osw.flush();
			} catch (Exception e) {
				System.out.print("Exception from Client run: " + e);
			}
		}
	}
	
}
