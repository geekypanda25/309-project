package com.jbr.springmvc.service;

import org.springframework.stereotype.Service;

import com.jbr.springmvc.model.Login;
import com.jbr.springmvc.model.User;

@Service
public interface UserService {

  void register(User user);

  User validateUser(Login login);
}
