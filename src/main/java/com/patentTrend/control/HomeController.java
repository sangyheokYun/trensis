package com.patentTrend.control;

import com.patentTrend.model.dto.Patent;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;


import java.nio.charset.Charset;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController {

    @GetMapping(value="/")
    public String home(){
        return "home";
    }

    @GetMapping(value = "/analysis")
    public String analysis(@RequestParam String searchWord, Model model){
        Map<String, String> todayWord = this.getTodayWord(); // 인기검색어
        Map<String, Patent> todayPatent = this.getTodayPatent(); // 오늘의 특허
        List<String> relationWord = this.getRelationWord(searchWord); // 연관검색어

        model.addAttribute("searchWord", searchWord);
        model.addAttribute("todayWord", todayWord);
        model.addAttribute("todayPatent", todayPatent);
        model.addAttribute("relationWord", relationWord);

        return "analysis";
    }

    public Map<String, String> getTodayWord(){
        String apiUrl = "https://api.trensis.site/api/getTodayWord";

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(apiUrl).build(false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(10000); // api 호출 타임아웃
        factory.setReadTimeout(10000); // api 읽기 타임아웃

        RestTemplate restTemplate = new RestTemplate(factory);

        ResponseEntity<Map> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, new HttpEntity(headers), Map.class);

        System.out.println("/getTodayWord : " + resultMap.getStatusCode());
        //System.out.println(resultMap.getHeaders());

        return resultMap.getBody();
    }

    public Map<String, Patent> getTodayPatent(){
        String apiUrl = "https://api.trensis.site/api/getTodayPatent";

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(apiUrl).build(false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(10000); // api 호출 타임아웃
        factory.setReadTimeout(10000); // api 읽기 타임아웃

        RestTemplate restTemplate = new RestTemplate(factory);

        ResponseEntity<Map> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, new HttpEntity(headers), Map.class);

        System.out.println("/getTodayPatent : " + resultMap.getStatusCode());
        //System.out.println(resultMap.getHeaders());

        return resultMap.getBody();
    }

    public List<String> getRelationWord(String searchWord){
        String apiUrl = "https://api.trensis.site/api/getRelationWord";

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("searchWord", searchWord)
                .build(false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(10000); // api 호출 타임아웃
        factory.setReadTimeout(10000); // api 읽기 타임아웃

        RestTemplate restTemplate = new RestTemplate(factory);

        ResponseEntity<List> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, new HttpEntity(headers), List.class);

        System.out.println("/getRelationWord : " + resultMap.getStatusCode());
        //System.out.println(resultMap.getHeaders());

        return resultMap.getBody();
    }


}
