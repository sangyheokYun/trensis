package com.patentTrend.control;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    @GetMapping(value="/")
    public String home(){
        return "home";
    }

    @GetMapping(value = "/analysis")
    public String analysis(@RequestParam String searchWord, Model model){

        model.addAttribute("searchWord", searchWord);

        return "analysis";
    }

}
