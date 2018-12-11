package com.roll19.restfulapi.repository;

import com.roll19.restfulapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{
}
