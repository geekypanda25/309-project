package net.roll19.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author kiriny
 */
@Controller
public class MainController {
    @GetMapping("/")
    public String index() {
        return "index";
    }
}
