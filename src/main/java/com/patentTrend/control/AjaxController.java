package com.patentTrend.control;

import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Map;

@RestController
public class AjaxController {

    @RequestMapping(value = "/getAuthorityTotal", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public Map getDocumentsTotal(String searchWord, String authority){

        String apiUrl = "https://api.trensis.site/api/getAuthorityTotal";

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("searchWord", searchWord)
                .queryParam("authority", authority)
                .build(false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(10000); // api 호출 타임아웃
        factory.setReadTimeout(10000); // api 읽기 타임아웃

        RestTemplate restTemplate = new RestTemplate(factory);

        ResponseEntity<Map> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, new HttpEntity(headers), Map.class);

        System.out.println("/getDocumentsTotal : " + resultMap.getStatusCode());
        //System.out.println(resultMap.getHeaders());

        return resultMap.getBody();
    }

    @RequestMapping("/getDocumentsYearTotal")
    @ResponseBody
    public Map getDocumentsYearTotal(String searchWord, String authority,
                                     String administration, String classify){
        String apiUrl = "https://api.trensis.site/api//getDocumentsYearTotal";

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("searchWord", searchWord)
                .queryParam("authority", authority)
                .queryParam("administration", administration)
                .queryParam("classify", classify)
                .build(false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(10000); // api 호출 타임아웃
        factory.setReadTimeout(10000); // api 읽기 타임아웃

        RestTemplate restTemplate = new RestTemplate(factory);

        ResponseEntity<Map> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, new HttpEntity(headers), Map.class);

        System.out.println("/getDocumentsYearTotal : " + resultMap.getStatusCode());
        //System.out.println(resultMap.getHeaders());

        return resultMap.getBody();
    }

    @RequestMapping("/getTrendsValue")
    @ResponseBody
    public Map getTrendsValue(String searchWord, String date){

        String apiUrl = "https://api.trensis.site/api/getTrendsValue";

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("searchWord", searchWord)
                .queryParam("date", date)
                .build(false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(15000); // api 호출 타임아웃
        factory.setReadTimeout(15000); // api 읽기 타임아웃

        RestTemplate restTemplate = new RestTemplate(factory);

        ResponseEntity<Map> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, new HttpEntity(headers), Map.class);

        System.out.println("/getTrendsValue : " + resultMap.getStatusCode());
        //System.out.println(resultMap.getHeaders());

        return resultMap.getBody();
    }

    @RequestMapping("/getTrendsCompareValue")
    @ResponseBody
    public Map getTrendsCompareValue(String searchWord, String compareWord, String date){
        String apiUrl = "https://api.trensis.site/api/getTrendsCompareValue";

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("searchWord", searchWord)
                .queryParam("compareWord", compareWord)
                .queryParam("date", date)
                .build(false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setConnectTimeout(15000); // api 호출 타임아웃
        factory.setReadTimeout(15000); // api 읽기 타임아웃

        RestTemplate restTemplate = new RestTemplate(factory);

        ResponseEntity<Map> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, new HttpEntity(headers), Map.class);

        System.out.println("/getTrendsCompareValue : " + resultMap.getStatusCode());
        //System.out.println(resultMap.getHeaders());

        return resultMap.getBody();
    }

}
