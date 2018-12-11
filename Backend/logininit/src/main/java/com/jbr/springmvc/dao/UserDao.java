package com.jbr.springmvc.dao;

import com.jbr.springmvc.model.Login;
import com.jbr.springmvc.model.User;

public interface UserDao {

  void register(User user);

  User validateUser(Login login);
}
