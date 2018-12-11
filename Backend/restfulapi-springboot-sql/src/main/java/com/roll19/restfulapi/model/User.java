package com.roll19.restfulapi.model;

import javax.persistence.*;

@Entity
public class User {
    private int id;
    private String name;
    private int proftype; //0 - spectator, 1 - player, 2 - mod
    private int cell[][];

    public User() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    public int[][] getCell(){ return cell; }
    public void setCell(int cell[][]){ this.cell = cell; }


}
