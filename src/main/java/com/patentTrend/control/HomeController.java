package com.patentTrend.control;

import com.patentTrend.service.TrensisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class HomeController {
    private TrensisService trensisService;

    @Autowired
    public HomeController(TrensisService trensisController) {
        this.trensisService = trensisController;
    }

    @GetMapping(value = "/")
    public String home(@RequestParam String searchWord, Model model){
        Map<String, String> todayWord = trensisService.getTodayWord(); // 인기검색어
        Map<String, String> todayPatent = trensisService.getTodayPatent(); // 오늘의 특허
        List<String> relationWord = trensisService.getRelationWord(searchWord); // 연관검색어

        model.addAttribute("searchWord", searchWord);
        model.addAttribute("todayWord", todayWord);
        model.addAttribute("todayPatent", todayPatent);
        model.addAttribute("relationWord", relationWord);

        return "index";
    }

    @RequestMapping("/getAuthorityTotal")
    @ResponseBody
    public Map getDocumentsTotal(String searchWord, String authority){
        return trensisService.getAuthorityTotal(searchWord, authority);
    }

    @RequestMapping("/getDocumentsTotal")
    @ResponseBody
    public Map getDocumentsTotal(String searchWord){
        return trensisService.getDocumentsTotal(searchWord);
    }

    @RequestMapping("/getDocumentsYearTotal")
    @ResponseBody
    public Map getDocumentsYearTotal(String searchWord, String authority,
                                     String administration, String classify){
        Map<String, Integer> map = trensisService.getDocumentsYearTotal(searchWord, authority, administration, classify);

        return map;
    }

    @RequestMapping("/getTrendsValue")
    @ResponseBody
    public Map getTrendsValue(String searchWord, String date){
        return trensisService.getTrendsValue(searchWord, date);
    }

    @RequestMapping("/getTrendsCompareValue")
    @ResponseBody
    public Map getTrendsCompareValue(String searchWord, String compareWord, String date){
        return trensisService.getTrendsCompareValue(searchWord, compareWord, date);
    }


}
