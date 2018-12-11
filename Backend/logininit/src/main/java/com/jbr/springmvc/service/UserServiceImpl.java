package com.jbr.springmvc.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.jbr.springmvc.dao.UserDao;
import com.jbr.springmvc.model.Login;
import com.jbr.springmvc.model.User;

public class UserServiceImpl implements UserService {

  @Autowired
  public UserDao userDao;

  public void register(User user) {
    userDao.register(user);
  }

  public User validateUser(Login login) {
    return userDao.validateUser(login);
  }

}
