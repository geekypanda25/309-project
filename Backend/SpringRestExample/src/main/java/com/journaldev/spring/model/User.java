package com.journaldev.spring.model;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;

public class User implements Serializable{


	
	private int id;
	private String name;
	private int proftype; //0 - spectator, 1 - player, 2 - mod
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public int getProf() {
		return proftype;
	}
	public void setProf(int proftype) {
		this.proftype = proftype;
	}
	
	
}
